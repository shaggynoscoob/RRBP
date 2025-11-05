import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';

const attendanceOptions = [
  'Coming',
  'I can’t cum',
  'Not sure',
  'definitely gonna cum'
];

const nonAlcDrinks = [
  'Water', 'Coke', 'Diet Coke', 'Sprite', 'Dr Pepper', 'Root Beer', 'Ginger Ale',
  'Iced Tea', 'Lemonade', 'Pineapple Juice', 'Coconut Water', 'Guava Juice',
  'Passion Orange', 'Lilikoi Juice', 'Mango Juice', 'POG', 'Aloha Maid',
  'Hawaiian Sun', 'Gatorade Blue', 'Gatorade Red', 'Red Bull', 'Monster',
  'Coffee', 'Iced Coffee', 'Cold Brew', 'Latte', 'Espresso', 'Matcha',
  'Green Tea', 'Arnold Palmer', 'Milk', 'Chocolate Milk', 'Almond Milk',
  'Oat Milk', 'Sparkling Water', 'La Croix', 'Bubly', 'San Pellegrino',
  'Perrier', 'Fiji Water', 'Smartwater', 'Electrolyte Packets', 'Nuun Tabs',
  'Liquid IV', 'Pedialyte', 'Kombucha', 'Kevita', 'GT’s', 'Health-Ade'
];

const alcDrinks = [
  'Bud Light', 'Coors Light', 'Michelob Ultra', 'Miller Lite', 'Heineken',
  'Corona', 'Modelo', 'Pacifico', 'Stella Artois', 'Guinness', 'IPA',
  'Hazy IPA', 'Kona Big Wave', 'Maui Bikini Blonde', 'Longboard Lager',
  'Fire Rock Pale Ale', 'Vodka', 'Tito’s', 'Smirnoff', 'Absolut', 'Rum',
  'Captain Morgan', 'Bacardi', 'Malibu', 'Tequila', 'Patron', 'Don Julio',
  'Casamigos', 'Jose Cuervo', 'Whiskey', 'Jack Daniels', 'Jameson', 'Maker’s Mark',
  'Bourbon', 'Scotch', 'Gin', 'Tanqueray', 'Bombay Sapphire', 'Wine',
  'Red Wine', 'White Wine', 'Rosé', 'Champagne', 'Prosecco', 'Seltzer',
  'White Claw', 'Truly', 'High Noon', 'Mike’s Hard', 'Smirnoff Ice'
];

const foods = [
  'Hot Dogs', 'Corn Dogs', 'S’mores', 'Hamburgers', 'Cheeseburgers', 'Veggie Burgers',
  'Chicken Skewers', 'Pork Ribs', 'Steak', 'Shrimp', 'Poke', 'Ahi Poke', 'Spicy Ahi',
  'Tako Poke', 'Lomi Salmon', 'Kalua Pig', 'Laulau', 'Poi', 'Lomi Lomi Salmon',
  'Mac Salad', 'Potato Salad', 'Coleslaw', 'Chips', 'Guac', 'Salsa', 'Queso',
  'Hummus', 'Pita', 'Veggies', 'Fruit Platter', 'Watermelon', 'Pineapple',
  'Mango', 'Papaya', 'Banana Lumpia', 'Malasadas', 'Haupia', 'Coconut Cake',
  'Brownies', 'Cookies', 'Ice Cream', 'Popsicles', 'Shave Ice', 'Snow Cones',
  'Rocks', 'Feet', 'Sand', 'Seaweed', 'Cigarette Butts', 'Plastic Straw', 'Flip Flop',
  'Sunscreen Bottle', 'Used Band-Aid', 'Dead Fish', 'Sea Cucumber', 'Jellyfish',
  'Coral', 'Volcanic Rock', 'Lava Rock', 'Coconut Shell', 'Palm Frond'
];

export default function RSVP() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [form, setForm] = useState({
    attendance: '',
    drink_non_alc: '',
    drink_alc: '',
    food: '',
    bringing: '',
    mad_libs_person: '',
    mad_libs_verb: ''
  });
  const [bringList, setBringList] = useState([]);
  const [invitees, setInvitees] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('current_user');
    if (saved) {
      const user = JSON.parse(saved);
      setName(user.name);
      fetchBringList();
      fetchInvitees();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchBringList = async () => {
    const { data } = await supabase.from('rsvps').select('bringing').neq('bringing', '');
    const items = data.map(d => d.bringing).filter(Boolean);
    setBringList([...new Set(items)]);
  };

  const fetchInvitees = async () => {
    const { data } = await supabase.from('invitees').select('name');
    setInvitees(data.map(d => d.name));
  };

  const verbs = [
    'fuck', 'suck', 'lick', 'bite', 'slap', 'punch', 'kick', 'choke', 'spank', 'whip',
    'cuddle', 'hug', 'kiss', 'high-five', 'bro-hug', 'dance with', 'sing to', 'cook for',
    'massage', 'worship', 'marry', 'kill', 'sleep with', 'eat ass of', 'motorboat',
    'teabag', 'rim', 'peg', 'dominate', 'submit to', 'tickle', 'prank', 'roast',
    'carry', 'piggyback', 'wrestle', 'race', 'bet against', 'cheer for', 'boo',
    'photograph', 'film', 'livestream', 'tag in meme', 'dedicate song to',
    'draw portrait of', 'write poem about', 'name child after', 'tattoo name of'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const madLibs = `I want to ${form.mad_libs_verb} ${form.mad_libs_person}.`;
    
    await supabase.from('rsvps').insert({
      invitee_name: name,
      ...form,
      mad_libs: madLibs
    });

    // // TWILIO SMS — COMMENTED OUT
    // const message = `${name} just RSVP'd: "${form.attendance}"! Party getting real.`;
    // await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     To: '+18089303345',
    //     From: '+1YOUR_TWILIO_NUMBER',
    //     Body: message
    //   })
    // });

    alert('RSVP sent! Mahalo!');
    navigate('/main');
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center">RSVP, {name}!</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Attendance */}
        <div>
          <label className="block text-lg font-bold mb-2">I am ___</label>
          <select
            value={form.attendance}
            onChange={e => setForm({...form, attendance: e.target.value})}
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          >
            <option value="">Select...</option>
            {attendanceOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Drinks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-bold mb-2">N/A Drinks</label>
            <input
              list="non-alc"
              value={form.drink_non_alc}
              onChange={e => setForm({...form, drink_non_alc: e.target.value})}
              placeholder="Type or select"
              className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <datalist id="non-alc">
              {nonAlcDrinks.map(d => <option key={d}>{d}</option>)}
            </datalist>
          </div>

          <div>
            <label className="block text-lg font-bold mb-2">21+</label>
            <input
              list="alc"
              value={form.drink_alc}
              onChange={e => setForm({...form, drink_alc: e.target.value})}
              placeholder="Type or select"
              className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <datalist id="alc">
              {alcDrinks.map(d => <option key={d}>{d}</option>)}
            </datalist>
          </div>
        </div>

        {/* Food */}
        <div>
          <label className="block text-lg font-bold mb-2">I want to eat</label>
          <input
            list="foods"
            value={form.food}
            onChange={e => setForm({...form, food: e.target.value})}
            placeholder="Type or select"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <datalist id="foods">
            {foods.map(f => <option key={f}>{f}</option>)}
          </datalist>
        </div>

        {/* Bringing */}
        <div>
          <label className="block text-lg font-bold mb-2">I will bring</label>
          <input
            value={form.bringing}
            onChange={e => setForm({...form, bringing: e.target.value})}
            placeholder="Food, drink, grill, firewood..."
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {bringList.length > 0 && (
            <p className="text-sm opacity-80 mt-2">
              Already bringing: {bringList.join(', ')}
            </p>
          )}
        </div>

        {/* Mad Libs */}
        <div>
          <label className="block text-lg font-bold mb-2">I want to ___ ___.</label>
          <div className="flex gap-2">
            <select
              value={form.mad_libs_verb}
              onChange={e => setForm({...form, mad_libs_verb: e.target.value})}
              className="flex-1 p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Verb...</option>
              {verbs.map(v => <option key={v}>{v}</option>)}
            </select>
            <select
              value={form.mad_libs_person}
              onChange={e => setForm({...form, mad_libs_person: e.target.value})}
              className="flex-1 p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Person...</option>
              {invitees.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl font-bold text-xl hover:scale-105 transition"
        >
          SUBMIT RSVP
        </button>
      </form>
    </div>
  );
}