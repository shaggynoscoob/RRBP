import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import RileyMode from './components/RileyMode.jsx';
import RSVP from './components/RSVP.jsx';
import Parking from './components/Parking.jsx';
import Donate from './components/Donate.jsx';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/riley" element={<RileyMode />} />
                <Route path="/rsvp" element={<div className="p-8 text-3xl">RSVP COMING SOON</div>} />
                <Route path="/parking" element={<div className="p-8 text-3xl">PARKING IMAGE</div>} />
                <Route path="/donate" element={<div className="p-8 text-3xl">VENMO QR</div>} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/rsvp" element={<RSVP />} />
                <Route path="/parking" element={<Parking />} />
                <Route path="/donate" element={<Donate />} />
            </Routes>
        </div>
    );
}

export default App;