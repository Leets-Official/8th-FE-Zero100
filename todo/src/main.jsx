import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TodoProvider from './context/TodoProvider';
import ModalProvider from './context/ModalProvider';
import './index.css';
import App from './App.jsx';

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
