import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import AuthProvider from './features/auth/context/AuthProvider.tsx';
import ModalProvider from './features/todo/context/ModalProvider.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('index.html에 id가 root인 요소가 없습니다.');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
