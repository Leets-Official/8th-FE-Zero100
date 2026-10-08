import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import TodoProvider from './contexts/todo/TodoProvider';
import { router } from './router';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </StrictMode>,
);
