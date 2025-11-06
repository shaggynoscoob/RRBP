import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
    const navigate = useNavigate();

    // If the page was loaded via a full refresh, force the user back to the login page.
    // This avoids keeping auth state from localStorage across hard refreshes while
    // leaving other localStorage keys intact.
    useEffect(() => {
        try {
            const nav = performance.getEntriesByType && performance.getEntriesByType('navigation');
            const type = nav && nav[0] ? nav[0].type : (performance.navigation && performance.navigation.type === 1 ? 'reload' : 'navigate');
            if (type === 'reload') {
                navigate('/');
            }
        } catch (e) {
            // If performance API isn't available, do nothing.
        }
    }, [navigate]);

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