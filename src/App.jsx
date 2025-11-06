import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import RileyMode from './components/RileyMode.jsx';
import RSVP from './components/RSVP.jsx';
import Parking from './components/Parking.jsx';
import Donate from './components/Donate.jsx';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('current_user');
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/rsvp" element={<ProtectedRoute><RSVP /></ProtectedRoute>} />
        <Route path="/parking" element={<ProtectedRoute><Parking /></ProtectedRoute>} />
        <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
        <Route
          path="/riley"
          element={localStorage.getItem('riley_auth') ? <RileyMode /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;