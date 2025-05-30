import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import { AuthProvider } from './context/AuthContext'; // AuthProvider import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* Wrap App inside AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
