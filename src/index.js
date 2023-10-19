import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import env from 'react-dotenv';

LicenseInfo.setLicenseKey(env.MUI_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
