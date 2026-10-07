import { useState } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import TodoItem from '../components/TodoItem/TodoItem';
import { getTodoStats } from '../utils/getTodoStats';

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'active', label: '진행 중' },
];

function TodoPage({ todos, filter, onFilterChange, onAdd, onToggle, onDelete, onEdit }) {
  const [inputValue, setInputValue] = useState('');

  const { activeCount: remainingCount } = getTodoStats(todos);

  const visibleTodos = todos.filter((todo) => filter === 'all' || !todo.completed);

  function handleSubmit(event) {
    event.preventDefault();

    const text = inputValue.trim();
    if (!text) return;

    onAdd(text);
    setInputValue('');
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label className="todo-form__label" htmlFor="new-todo">
          할 일을 입력하세요
        </label>

        <div className="todo-form__controls">
          <Input
            id="new-todo"
            label="새 할 일"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="새 할 일 추가"
          />

          <Button type="submit" disabled={!inputValue.trim()}>
            추가
          </Button>
        </div>
      </form>

      <div className="todo-filter" role="group" aria-label="작업 조회 조건">
        {filters.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? 'primary' : 'secondary'}
            pressed={filter === option.value}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <section className="todo-tasks" aria-labelledby="todo-count">
        <h2 id="todo-count" className="todo-tasks__count" aria-live="polite">
          남은 할 일 {remainingCount}개
        </h2>

        {visibleTodos.length === 0 ? (
          <p className="todo-tasks__empty">
            {filter === 'active' ? '진행 중인 할 일이 없습니다.' : '등록된 할 일이 없습니다.'}
          </p>
        ) : (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default TodoPage;
