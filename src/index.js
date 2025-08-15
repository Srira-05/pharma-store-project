import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <-- MAKE SURE THIS LINE IS HERE
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();