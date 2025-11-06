import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import { useNavigate } from 'react-router-dom';

export default function RileyMode() {
  const [invitees, setInvitees] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [activeTab, setActiveTab] = useState('invitees');
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editWelcome, setEditWelcome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('riley_auth')) {
      navigate('/');
      return;
    }
    fetchInvitees();
    fetchRsvps();
  }, [navigate]);

  const fetchInvitees = async () => {
    const { data } = await supabase.from('invitees').select('*').order('name');
    setInvitees(data);
  };

  const fetchRsvps = async () => {
    const { data } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
    setRsvps(data);
  };

  const addInvitee = async () => {
    if (!newName.trim()) return;
    await supabase.from('invitees').insert({ name: newName.trim(), welcome_message: `${newName.trim()}'s here!` });
    setNewName('');
    fetchInvitees();
  };

  const updateInvitee = async (id) => {
    await supabase.from('invitees').update({ name: editName, welcome_message: editWelcome }).eq('id', id);
    setEditingId(null);
    fetchInvitees();
  };

  const deleteInvitee = async (id) => {
    await supabase.from('invitees').delete().eq('id', id);
    fetchInvitees();
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">RILEY MODE</h1>
        <button
          onClick={() => {
            localStorage.removeItem('riley_auth');
            navigate('/');
          }}
          className="px-4 py-2 bg-gray-600 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 border-b border-white/20">
        <button
          onClick={() => setActiveTab('invitees')}
          className={`px-6 py-3 font-bold ${activeTab === 'invitees' ? 'bg-white/20 rounded-t-lg' : 'opacity-70'}`}
        >
          Invitees ({invitees.length})
        </button>
        <button
          onClick={() => setActiveTab('rsvps')}
          className={`px-6 py-3 font-bold ${activeTab === 'rsvps' ? 'bg-white/20 rounded-t-lg' : 'opacity-70'}`}
        >
          RSVPs ({rsvps.length})
        </button>
      </div>

      {activeTab === 'invitees' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addInvitee()}
              placeholder="Add new name..."
              className="flex-1 p-3 rounded-lg bg-white text-black"
            />
            <button onClick={addInvitee} className="px-6 py-3 bg-green-600 rounded-lg font-bold">
              ADD
            </button>
          </div>

          <div className="space-y-2">
            {invitees.map((inv) => (
              <div key={inv.id} className="bg-white/10 backdrop-blur p-4 rounded-lg flex items-center justify-between">
                {editingId === inv.id ? (
                  <div className="flex-1 flex gap-2">
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 p-2 rounded bg-white text-black" />
                    <input value={editWelcome} onChange={(e) => setEditWelcome(e.target.value)} placeholder="Welcome message" className="flex-1 p-2 rounded bg-white text-black" />
                    <button onClick={() => updateInvitee(inv.id)} className="px-3 py-1 bg-green-600 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-600 rounded">Cancel</button>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-bold">{inv.name}</p>
                      <p className="text-sm opacity-80">{inv.welcome_message}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(inv.id);
                          setEditName(inv.name);
                          setEditWelcome(inv.welcome_message);
                        }}
                        className="px-3 py-1 bg-blue-600 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteInvitee(inv.id)} className="px-3 py-1 bg-red-600 rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rsvps' && (
        <div className="space-y-3">
          {rsvps.length === 0 ? (
            <p className="text-center opacity-70">No RSVPs yet...</p>
          ) : (
            rsvps.map((r) => (
              <div key={r.id} className="bg-white/10 backdrop-blur p-4 rounded-lg space-y-2">
                <p className="font-bold text-lg">{r.invitee_name}</p>
                <p><strong>Attendance:</strong> {r.attendance}</p>
                {r.drink_non_alc && <p><strong>N/A Drink:</strong> {r.drink_non_alc}</p>}
                {r.drink_alc && <p><strong>21+:</strong> {r.drink_alc}</p>}
                {r.food && <p><strong>Food:</strong> {r.food}</p>}
                {r.bringing && <p><strong>Bringing:</strong> {r.bringing}</p>}
                {r.mad_libs && <p className="italic">"{r.mad_libs}"</p>}
                <p className="text-xs opacity-60">Submitted: {new Date(r.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}