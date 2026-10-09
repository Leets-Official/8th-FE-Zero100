import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import TasksProvider from './context/TasksProvider';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TasksProvider>
        <App />
      </TasksProvider>
    </BrowserRouter>
  </StrictMode>,
);
