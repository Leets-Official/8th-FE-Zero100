import { useState } from 'react';
import Text from './components/common/Text/Text';
import TodoFilter from './components/todo/TodoFilter/TodoFilter';
import TodoForm from './components/todo/TodoForm/TodoForm';
import TodoList from './components/todo/TodoList/TodoList';
import { EMPTY_MESSAGE_BY_FILTER, TODO_FILTER } from './constants/todoFilter';
import { useTodos } from './hooks/useTodos';
import { filterTodos } from './utils/filterTodos';

function App() {
  const { todos, addTodo } = useTodos();
  const [currentFilter, setCurrentFilter] = useState(TODO_FILTER.ALL);

  const visibleTodos = filterTodos(todos, currentFilter);
  const remainingCount = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <main className="mx-auto w-full max-w-[552px] px-4 py-15">
      <header className="mb-6 flex flex-col gap-4">
        <Text as="h1" variant="title">
          TodoMatic
        </Text>
        <TodoForm onAddTodo={addTodo} />
        <TodoFilter currentFilter={currentFilter} onChangeFilter={setCurrentFilter} />
      </header>

      <section className="flex flex-col gap-2" aria-labelledby="remaining-count">
        <Text as="h2" variant="heading" id="remaining-count" aria-live="polite">
          남은 할 일 {remainingCount}개
        </Text>
        <TodoList todos={visibleTodos} emptyMessage={EMPTY_MESSAGE_BY_FILTER[currentFilter]} />
      </section>
    </main>
  );
}

export default App;
