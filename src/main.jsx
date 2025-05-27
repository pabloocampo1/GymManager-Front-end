import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QRCodeSVG} from 'qrcode.react';

createRoot(document.getElementById('root')).render(
  //<StrictMode>
   
    <App />
  //</StrictMode>,
)
