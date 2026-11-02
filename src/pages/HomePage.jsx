import { useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import TodoList from '../components/TodoList.jsx';
import { useTodos } from '../context/useTodos.js';

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'active', label: '진행 중' },
];

function HomePage() {
  const { todos, addTodo, remainingCount } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    return true;
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo('');
  }

  return (
    <>
      <section aria-label="할 일 입력과 필터" className="flex flex-col items-start gap-2">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            variant="fluid"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="새 할 일 추가"
            aria-label="새 할 일"
          />
          <Button type="submit">추가</Button>
        </form>
        <div className="flex flex-wrap gap-2" role="group" aria-label="할 일 필터">
          {filters.map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'primary' : 'secondary'}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      <section aria-label="할 일 목록" className="flex flex-col gap-2">
        <h2 className="text-[17.6px] leading-[26.4px] font-bold text-[#222]">
          남은 할 일 {remainingCount}개
        </h2>
        <TodoList todos={visibleTodos} />
      </section>
    </>
  );
}

export default HomePage;
