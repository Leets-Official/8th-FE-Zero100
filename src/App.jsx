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

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState('');

  const remainingCount = todos.filter((todo) => !todo.completed).length;

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

  return (
    <main className="todo-app">
      <h1 className="todo-app__title">TodoMatic</h1>

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
        <Button pressed={true}>전체보기</Button>

        <Button variant="secondary" pressed={false}>
          진행 중
        </Button>

        <Button variant="secondary" pressed={false}>
          완료됨
        </Button>
      </div>

      <section className="todo-tasks" aria-labelledby="todo-count">
        <h2 id="todo-count" className="todo-tasks__count">
          남은 할 일 {remainingCount}개
        </h2>

        {todos.length === 0 ? (
          <p className="todo-tasks__empty">등록된 할 일이 없습니다.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
