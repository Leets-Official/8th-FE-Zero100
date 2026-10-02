import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageLayout from '../components/PageLayout.jsx';
import Statistics from '../components/Statistics.jsx';
import TodoList from '../components/TodoList.jsx';

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';

// 통계는 별도 route가 아니라 메인 페이지 안에서 콘텐츠만 전환
const TAB_TODO = 'todo';
const TAB_STATISTICS = 'statistics';

const TAB_BASE_CLASS_NAME =
  'box-border flex items-center justify-center h-[32.5px] m-0 p-0 border-0 border-b-2 border-solid border-transparent bg-transparent font-[family-name:var(--font-family-base)] font-semibold text-[14.08px] leading-[21.12px] tracking-[0px] text-[#888888] whitespace-nowrap cursor-pointer';

function TodoPage({ todos, onAddTodo, onToggleTodo, onEditTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState(FILTER_ALL);
  const [activeTab, setActiveTab] = useState(TAB_TODO);

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
            'font-[family-name:var(--font-family-base)] font-bold text-[14.4px] leading-[21.6px] tracking-[0px] text-center',
        }
      : {
          variant: 'secondary',
          className:
            'font-[family-name:var(--font-family-base)] font-bold text-[14.4px] leading-[21.6px] tracking-[0px] text-center text-[#555555]',
        };

  const getTabClassName = (tab, widthClassName) =>
    twMerge(
      TAB_BASE_CLASS_NAME,
      widthClassName,
      activeTab === tab && 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]',
    );

  return (
    <PageLayout>
      <PageHeader title="TodoMatic" navLabel="완료 목록 →" navTo="/completed" />
      <nav
        className={twMerge(
          'flex flex-row items-start gap-[24px] w-[520px] h-[32.5px] border-0 border-b-[1.5px] border-solid border-[#e5e5e5]',
        )}
      >
        <button
          type="button"
          className={getTabClassName(TAB_TODO, 'w-[63px]')}
          onClick={() => setActiveTab(TAB_TODO)}
        >
          할 일 목록
        </button>
        <button
          type="button"
          className={getTabClassName(TAB_STATISTICS, 'w-[30px]')}
          onClick={() => setActiveTab(TAB_STATISTICS)}
        >
          통계
        </button>
      </nav>
      {activeTab === TAB_STATISTICS ? (
        <Statistics todos={todos} />
      ) : (
        <>
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
          />
        </>
      )}
    </PageLayout>
  );
}

export default TodoPage;
