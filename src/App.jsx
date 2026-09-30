import { useState } from 'react';
import CompletedPage from './pages/CompletedPage.jsx';
import TodoPage from './pages/TodoPage.jsx';

const initialTodos = [
  { id: 'todo-1', title: '밥 먹기', completed: false },
  { id: 'todo-2', title: '코드 공부하기', completed: true },
  { id: 'todo-3', title: '잠자기', completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [showCompletedPage, setShowCompletedPage] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function updateTodo(todoId, title) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === todoId ? { ...todo, title } : todo)),
    );
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  }

  const sharedTodoProps = {
    todos,
    onAddTodo: addTodo,
    onToggleTodo: toggleTodo,
    onUpdateTodo: updateTodo,
    onDeleteTodo: deleteTodo,
  };

  return (
    <div className="app-background">
      {showCompletedPage ? (
        <CompletedPage {...sharedTodoProps} onBack={() => setShowCompletedPage(false)} />
      ) : (
        <TodoPage
          {...sharedTodoProps}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onViewCompleted={() => setShowCompletedPage(true)}
        />
      )}
    </div>
  );
}

export default App;
