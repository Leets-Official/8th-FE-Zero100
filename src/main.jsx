import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import ModalProvider from './contexts/ModalProvider.jsx';
import TodoProvider from './contexts/TodoProvider.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TodoProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </TodoProvider>
    </BrowserRouter>
  </StrictMode>,
);
