// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// If the page was loaded via a full browser refresh, force a navigation to the
// domain root (origin). This ensures refreshes always start from the root and
// avoids persisting problematic localStorage auth state on deployed sites.
try {
  const navEntries = (performance.getEntriesByType && performance.getEntriesByType('navigation')) || [];
  const navType = navEntries[0] ? navEntries[0].type : (performance.navigation && performance.navigation.type === 1 ? 'reload' : 'navigate');
  if (navType === 'reload') {
    // Use origin (protocol + host + port) to drop any path/query/hash
    if (window.location.href !== window.location.origin) {
      window.location.href = window.location.origin;
    }
  }
} catch (e) {
  // ignore if performance API isn't available
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);