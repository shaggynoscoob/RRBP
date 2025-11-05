import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';

export default function RileyMode() {
  const [invitees, setInvitees] = useState([]);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  useEffect(() => {
    fetchInvitees();
  }, []);

  const fetchInvitees = async () => {
    const { data } = await supabase.from('invitees').select('*').order('name');
    setInvitees(data);
  };

  const addName = async () => {
    if (!newName.trim()) return;
    await supabase.from('invitees').insert({ name: newName.trim() });
    setNewName('');
    fetchInvitees();
  };

  const updateMessage = async (id) => {
    await supabase.from('invitees').update({ welcome_message: editMessage }).eq('id', id);
    setEditing(null);
    fetchInvitees();
  };

  const deleteName = async (id) => {
    await supabase.from('invitees').delete().eq('id', id);
    fetchInvitees();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">RILEY MODE</h1>

      {/* Add Name */}
      <div className="flex gap-2">
        <input
          placeholder="New name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
        />
        <button
          onClick={addName}
          className="px-6 py-2 bg-green-600 rounded-lg font-bold hover:scale-105 transition"
        >
          ADD
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {invitees.map((inv) => (
          <div key={inv.id} className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center justify-between">
            <div className="flex-1">
              <span className="font-bold">{inv.name}</span>
              {editing === inv.id ? (
                <input
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="ml-2 px-2 py-1 rounded bg-white/20 text-sm"
                />
              ) : (
                <p className="text-sm opacity-80 ml-2">"{inv.welcome_message}"</p>
              )}
            </div>
            <div className="flex gap-2">
              {editing === inv.id ? (
                <>
                  <button onClick={() => updateMessage(inv.id)} className="text-green-400">Save</button>
                  <button onClick={() => setEditing(null)} className="text-gray-400">Cancel</button>
                </>
              ) : (
                <button onClick={() => { setEditing(inv.id); setEditMessage(inv.welcome_message); }} className="text-blue-400">Edit</button>
              )}
              <button onClick={() => deleteName(inv.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Export RSVPs */}
      <button
        onClick={async () => {
          const { data } = await supabase.from('rsvps').select('*');
          const csv = [
            ['Name', 'Attendance', 'Drink (NA)', 'Drink (Alc)', 'Food', 'Bringing', 'Mad Libs'],
            ...data.map(r => [r.invitee_name, r.attendance, r.drink_non_alc, r.drink_alc, r.food, r.bringing, r.mad_libs])
          ].map(row => row.join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'rsvps.csv';
          a.click();
        }}
        className="w-full py-3 bg-yellow-600 rounded-lg font-bold hover:scale-105 transition"
      >
        DOWNLOAD RSVPs (CSV)
      </button>
    </div>
  );
}