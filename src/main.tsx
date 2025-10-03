import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReceptionScreen } from '@/components/ReceptionScreen';
import './index.css';

// =============================
// 🚀 Application Entry Point
// =============================
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReceptionScreen />
  </React.StrictMode>
);
