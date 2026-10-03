import { useState } from 'react';
import DeleteTodoModal from '../components/todo/DeleteTodoModal.jsx';
import { useTodos } from '../hooks/useTodos.js';
import { ModalContext } from './ModalContext.js';

function ModalProvider({ children }) {
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const { todos, deleteTodo } = useTodos();
  const pendingTodo = todos.find((todo) => todo.id === pendingDeleteId);

  function closeModal() {
    setPendingDeleteId(null);
  }

  function confirmDelete() {
    deleteTodo(pendingDeleteId);
    closeModal();
  }

  return (
    <ModalContext.Provider value={{ openDeleteModal: setPendingDeleteId, closeModal }}>
      {children}
      {pendingTodo && (
        <DeleteTodoModal todo={pendingTodo} onCancel={closeModal} onConfirm={confirmDelete} />
      )}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
