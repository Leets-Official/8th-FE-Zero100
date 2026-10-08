import { useState } from 'react';
import Text from '../components/common/Text/Text';
import TodoFilter from '../components/todo/TodoFilter/TodoFilter';
import TodoForm from '../components/todo/TodoForm/TodoForm';
import TodoList from '../components/todo/TodoList/TodoList';
import { EMPTY_MESSAGE_BY_FILTER, TODO_FILTER } from '../constants/todoFilter';
import { useTodos } from '../hooks/useTodos';
import { filterTodos } from '../utils/filterTodos';

function TodoListPage() {
  const { todos, addTodo } = useTodos();
  const [currentFilter, setCurrentFilter] = useState(TODO_FILTER.ALL);

  const visibleTodos = filterTodos(todos, currentFilter);
  const remainingCount = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <>
      <div className="flex flex-col gap-2">
        <TodoForm onAddTodo={addTodo} />
        <TodoFilter currentFilter={currentFilter} onChangeFilter={setCurrentFilter} />
      </div>

      <section className="flex flex-col gap-2" aria-labelledby="remaining-count">
        <Text as="h2" variant="heading" id="remaining-count" aria-live="polite">
          남은 할 일 {remainingCount}개
        </Text>
        <TodoList todos={visibleTodos} emptyMessage={EMPTY_MESSAGE_BY_FILTER[currentFilter]} />
      </section>
    </>
  );
}

export default TodoListPage;
