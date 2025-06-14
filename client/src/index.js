import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import Homepage from './pages/Homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Homepage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);
