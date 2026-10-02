import { useState } from 'react';
import Text from './components/common/Text/Text';
import TodoFilter from './components/todo/TodoFilter/TodoFilter';
import TodoForm from './components/todo/TodoForm/TodoForm';
import TodoList from './components/todo/TodoList/TodoList';
import { INITIAL_TODOS } from './constants/initialTodos';
import { EMPTY_MESSAGE_BY_FILTER, TODO_FILTER } from './constants/todoFilter';
import { filterTodos } from './utils/filterTodos';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [currentFilter, setCurrentFilter] = useState(TODO_FILTER.ALL);

  const visibleTodos = filterTodos(todos, currentFilter);
  const remainingCount = todos.filter((todo) => !todo.isCompleted).length;

  const addTodo = (text) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text, isCompleted: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <Text as="h1" variant="title">
          TodoMatic
        </Text>
        <TodoForm onAddTodo={addTodo} />
        <TodoFilter currentFilter={currentFilter} onChangeFilter={setCurrentFilter} />
      </header>

      <section className={styles.listSection} aria-labelledby="remaining-count">
        <Text as="h2" variant="heading" id="remaining-count" aria-live="polite">
          남은 할 일 {remainingCount}개
        </Text>
        <TodoList
          todos={visibleTodos}
          emptyMessage={EMPTY_MESSAGE_BY_FILTER[currentFilter]}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </section>
    </main>
  );
}

export default App;
