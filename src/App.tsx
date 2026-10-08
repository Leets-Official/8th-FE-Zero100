import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Completed from './pages/Completed';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { TodoItem, type Todo } from './components/TodoItem';

type FilterType = 'all' | 'active' | 'completed';

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('tasks');

    if (!savedTodos) {
      return [];
    }

    return JSON.parse(savedTodos);
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text }
          : todo
      )
    );
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const totalCount = todos.length;

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

const completionRate =
  totalCount === 0
    ? 0
    : Math.round((completedCount / totalCount) * 100);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'sans-serif',
      }}
    >
      <h2>Zero100 Todo List</h2>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <Input
          value={input}
          onChange={setInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />

        <Button onClick={addTodo}>추가</Button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '4px',
          }}
        >
          <Button onClick={() => setFilter('all')}>
            전체
          </Button>

          <Button onClick={() => setFilter('active')}>
            진행 중
          </Button>

          <Button onClick={() => setFilter('completed')}>
            완료
          </Button>
        </div>

        <span
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          남은 할 일: {activeCount}개
        </span>
      </div>

     <div
  style={{
    marginBottom: '16px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  }}
>
  <div>전체: {totalCount}개</div>
  <div>진행 중: {activeCount}개</div>
  <div>완료: {completedCount}개</div>
  <div>완료율: {completionRate}%</div>
</div>

<div style={{ marginBottom: '16px' }}>
  <Link to="/completed">
    완료 목록 보기
  </Link>
</div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
    </BrowserRouter>
  );
}