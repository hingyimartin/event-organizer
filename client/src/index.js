import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';

// pages
import Homepage from './pages/Homepage';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import EventManager from './pages/EventManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Homepage />} />
              <Route path='/events' element={<Events />} />
              <Route path='/my-events' element={<MyEvents />} />
              <Route path='/event-manager' element={<EventManager />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
