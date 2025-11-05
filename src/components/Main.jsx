import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  const [welcome, setWelcome] = useState('');

  useEffect(() => {
    setWelcome(localStorage.getItem('welcome') || 'Welcome!');
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Welcome */}
      <div className="text-center animate-fadeIn">
        <h1 className="text-5xl font-black animate-pulse">{welcome}</h1>
      </div>

      {/* Party Info */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-4">
        <h2 className="text-3xl font-bold">When</h2>
        <p className="text-xl">Saturday, November 22nd @ 3PM</p>
        <p className="text-sm opacity-80">Tsunami? → Nov 29th</p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-4">
        <h2 className="text-3xl font-bold">Where</h2>
        <p className="text-xl">Fresh Air’s, Haleiwa</p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://maps.apple.com/?q=Fresh+Air+Haleiwa"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:scale-105 transition"
          >
            Apple Maps
          </a>
          <a
            href="https://maps.google.com/?q=Fresh+Air+Haleiwa"
            className="px-4 py-2 bg-red-600 rounded-lg hover:scale-105 transition"
          >
            Google Maps
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/rsvp"
          className="p-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl text-center font-bold text-xl hover:scale-105 transition"
        >
          RSVP
        </Link>
        <a
          href="https://photos.app.goo.gl/nCCyakJu3Hey6quX7"
          className="p-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl text-center font-bold text-xl hover:scale-105 transition"
        >
          Photos
        </a>
        <Link
          to="/parking"
          className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl text-center font-bold text-xl hover:scale-105 transition"
        >
          Parking
        </Link>
        <Link
          to="/donate"
          className="p-6 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl text-center font-bold text-xl hover:scale-105 transition"
        >
          Donate
        </Link>
      </div>
    </div>
  );
}