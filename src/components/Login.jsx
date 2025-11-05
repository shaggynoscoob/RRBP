import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanName = name.trim().toLowerCase();
    if (!cleanName) return;

    const { data, error } = await supabase
      .from('invitees')
      .select('name, welcome_message')
      .ilike('name', cleanName)
      .single();

    if (error || !data) {
      setError('Try again or call (808) 930-3345');
      return;
    }

    if (cleanName === 'riley') {
      if (!showPassword) {
        setShowPassword(true);
        return;
      }
      if (password.toUpperCase() !== 'RETARDED') {
        setError('Wrong password, retard.');
        return;
      }
      navigate('/riley');
    } else {
      localStorage.setItem('welcome', data.welcome_message);
      navigate('/main');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg p-8 shadow-2xl transform transition-all duration-700 ease-out ${
          true ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-2 animate-pulse">
          RRBP
        </h1>
        <p className="text-center text-sm opacity-80 mb-8">
          Riley’s Retarded Birthday Party
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/50 text-white text-lg focus:outline-none focus:ring-4 focus:ring-pink-500 transition"
            autoFocus
          />

          {showPassword && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/50 text-white text-lg focus:outline-none focus:ring-4 focus:ring-pink-500 transition animate-fadeIn"
            />
          )}

          {error && (
            <p className="text-red-400 text-center font-medium animate-shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 font-bold text-xl hover:scale-105 transform transition active:scale-95"
          >
            {showPassword ? 'ENTER' : 'LET ME IN'}
          </button>
        </form>
      </div>
    </div>
  );
}