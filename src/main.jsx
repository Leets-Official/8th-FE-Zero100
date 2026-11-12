import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import DeleteModalProvider from './contexts/deleteModal/DeleteModalProvider';
import TodoProvider from './contexts/todo/TodoProvider';
import { router } from './router';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
      <DeleteModalProvider>
        <RouterProvider router={router} />
      </DeleteModalProvider>
    </TodoProvider>
  </StrictMode>,
);
