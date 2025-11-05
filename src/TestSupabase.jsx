// src/TestSupabase.jsx
import { supabase } from './supabaseClient';

function TestSupabase() {
  const test = async () => {
    const { data, error } = await supabase.from('invitees').select('name');
    console.log('Supabase test:', data, error);
  };

  return <button onClick={test} className="p-4 bg-red-500 text-white">TEST DB</button>;
}

export default TestSupabase;