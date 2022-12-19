import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global/index.scss';
import App from "./pages/App.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
