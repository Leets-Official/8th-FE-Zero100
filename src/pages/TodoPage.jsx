import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageLayout from '../components/PageLayout.jsx';
import Statistics from '../components/Statistics.jsx';
import TabNav from '../components/TabNav.jsx';
import TodoForm from '../components/TodoForm.jsx';
import TodoList from '../components/TodoList.jsx';

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';

// 통계는 별도 route가 아니라 메인 페이지 안에서 콘텐츠만 전환
const TAB_TODO = 'todo';
const TAB_STATISTICS = 'statistics';

const TABS = [
  { value: TAB_TODO, label: '할 일 목록', className: 'w-[63px]' },
  { value: TAB_STATISTICS, label: '통계', className: 'w-[30px]' },
];

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

  return (
    <PageLayout>
      <PageHeader title="TodoMatic" navLabel="완료 목록 →" navTo="/completed" />
      <TabNav tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
      {activeTab === TAB_STATISTICS ? (
        <Statistics todos={todos} />
      ) : (
        <>
          <div className={twMerge('flex flex-col self-stretch gap-[8px]')}>
            <TodoForm value={inputValue} onChange={setInputValue} onSubmit={handleAddTodo} />
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
