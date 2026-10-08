import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import TodoProvider from './contexts/todo/TodoProvider';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
);
