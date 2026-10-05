import { useState } from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import TodoItem from './components/TodoItem/TodoItem';
import './App.css';

const initialTodos = [
  { id: 1, text: '밥 먹기', completed: false },
  { id: 2, text: '리츠 출석하기', completed: true },
  { id: 3, text: '잠자기', completed: false },
];

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료됨' },
];

const emptyMessages = {
  all: '등록된 할 일이 없습니다.',
  active: '진행 중인 할 일이 없습니다.',
  completed: '완료된 할 일이 없습니다.',
};

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  function handleAdd(event) {
    event.preventDefault();

    const text = inputValue.trim();
    if (!text) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue('');
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleEdit(id, text) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  }

  return (
    <main className="todo-app">
      <h1 className="todo-app__title">TodoMatic</h1>
      {/* <p className="text-[24px] font-bold text-[#4f46e5]">Tailwind 적용 확인</p> */}
      <form className="todo-form" onSubmit={handleAdd}>
        <label className="todo-form__label" htmlFor="new-todo">
          할 일을 입력하세요
        </label>

        <div className="todo-form__controls">
          <Input
            id="new-todo"
            label="새 할 일"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="새 할 일 추가"
          />

          <Button type="submit">추가</Button>
        </div>
      </form>

      <div className="todo-filter" role="group" aria-label="작업 조회 조건">
        {filters.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? 'primary' : 'secondary'}
            pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <section className="todo-tasks" aria-labelledby="todo-count">
        <h2 id="todo-count" className="todo-tasks__count">
          {filter === 'completed'
            ? `완료된 작업 ${completedCount}개`
            : `남은 할 일 ${remainingCount}개`}
        </h2>

        {visibleTodos.length === 0 ? (
          <p className="todo-tasks__empty">{emptyMessages[filter]}</p>
        ) : (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
