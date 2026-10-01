import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageLayout from '../components/PageLayout.jsx';
import TodoList from '../components/TodoList.jsx';

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';

function TodoPage({ todos, onAddTodo, onToggleTodo, onEditTodo, onDeleteTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState(FILTER_ALL);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = filter === FILTER_ACTIVE ? todos.filter((todo) => !todo.completed) : todos;

  const handleAddTodo = (event) => {
    event.preventDefault();

    const title = inputValue.trim();
    if (!title) return;

    onAddTodo(title);
    setInputValue('');
  };

  const getFilterButtonProps = (buttonFilter) =>
    filter === buttonFilter
      ? {
          variant: 'primary',
          className:
            'font-[family-name:var(--font-family-base)] font-semibold text-[14.4px] leading-[21.6px] tracking-[0px] text-center',
        }
      : { variant: 'secondary' };

  return (
    <PageLayout>
      <PageHeader
        title="TodoMatic"
        navLabel="완료 목록 →"
        navTo="/completed"
        subtitle="할 일을 입력하세요"
      />
      <div className={twMerge('flex flex-col self-stretch gap-[8px]')}>
        <form className={twMerge('flex flex-row gap-[8px] w-max')} onSubmit={handleAddTodo}>
          <input
            className={twMerge(
              'box-border min-w-[440px] h-[44px] py-[10px] px-[14px] border-[1px] border-solid border-[#cccccc] rounded-[var(--radius-control)] bg-[#ffffff]',
            )}
            type="text"
            placeholder="새 할 일 추가"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button type="submit" variant="primary" size="medium">
            추가
          </Button>
        </form>
        <div className={twMerge('flex flex-row gap-[8px] w-[520px] h-[44.8px]')}>
          <Button
            size="medium"
            {...getFilterButtonProps(FILTER_ALL)}
            onClick={() => setFilter(FILTER_ALL)}
          >
            전체보기
          </Button>
          <Button
            size="medium"
            {...getFilterButtonProps(FILTER_ACTIVE)}
            onClick={() => setFilter(FILTER_ACTIVE)}
          >
            진행 중
          </Button>
        </div>
      </div>
      <TodoList
        title={`남은 할 일 ${remainingCount}개`}
        todos={visibleTodos}
        onToggleTodo={onToggleTodo}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </PageLayout>
  );
}

export default TodoPage;
