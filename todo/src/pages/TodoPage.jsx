import { useState } from 'react';
import { Link } from 'react-router-dom';
import Text from '../components/common/Text';
import TodoForm from '../components/TodoForm';
import FilterButtons from '../components/FilterButtons';
import TodoList from '../components/TodoList';
import Stats from '../components/Stats';
import { useTodos } from '../context/TodoContext';

const TodoPage = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState('all');
  const [tab, setTab] = useState('list');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const tabClass = (name) =>
    `px-3 py-2 text-sm border-b-2 ${
      tab === name
        ? 'border-indigo-600 text-indigo-600 font-semibold'
        : 'border-transparent text-gray-500'
    }`;

  return (
    <main className="app">
      <div className="flex items-center justify-between">
        <Text as="h1" variant="title">
          TodoMatic
        </Text>
        <Link to="/completed" className="text-sm text-indigo-600">
          완료 목록 →
        </Link>
      </div>

      <nav className="mb-4 flex gap-2 border-b border-gray-200">
        <button type="button" className={tabClass('list')} onClick={() => setTab('list')}>
          할 일 목록
        </button>
        <button type="button" className={tabClass('stats')} onClick={() => setTab('stats')}>
          통계
        </button>
      </nav>

      {tab === 'list' ? (
        <>
          <TodoForm onAdd={addTodo} />
          <FilterButtons filter={filter} onChangeFilter={setFilter} />
          <Text as="h3" variant="count">
            남은 할 일 {remainingCount}개
          </Text>
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </>
      ) : (
        <Stats />
      )}
    </main>
  );
};

export default TodoPage;
