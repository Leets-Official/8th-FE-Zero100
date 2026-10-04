import { useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router';
import Button from './components/Button.jsx';
import Input from './components/Input.jsx';
import TodoItem from './components/TodoItem.jsx';
import { useTodos } from './context/useTodos.js';

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'active', label: '진행 중' },
];

function TodoList({ todos }) {
  const { updateTodo, deleteTodo } = useTodos();

  if (todos.length === 0) {
    return <p className="py-4 text-[#767676]">표시할 할 일이 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={(completed) => updateTodo(todo.id, { completed })}
          onUpdate={(text) => updateTodo(todo.id, { text })}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

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

function CompletedPage() {
  const { todos, completedCount } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <section aria-label="완료 목록" className="flex flex-col gap-2">
      <h2 className="text-[17.6px] leading-[26.4px] font-bold text-[#222]">
        완료한 할 일 {completedCount}개
      </h2>
      <TodoList todos={completedTodos} />
    </section>
  );
}

function StatsPage() {
  const { totalCount, remainingCount, completedCount, completionRate } = useTodos();
  const counts = [
    { label: '전체', count: totalCount },
    { label: '진행 중', count: remainingCount },
    { label: '완료', count: completedCount },
  ];

  return (
    <section aria-label="할 일 통계" className="flex flex-col text-[#222]">
      <h2 className="text-[20px] font-bold">할 일 통계</h2>
      <p className="mt-1 text-sm text-[#767676]">할 일을 얼마나 완료했는지 한눈에 확인하세요.</p>

      <div className="mt-4 rounded-[10px] border border-[#dedbff] bg-[#f7f6ff] p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#222]">완료율</h3>
            <p className="mt-1 text-sm text-[#767676]">
              전체 {totalCount}개 중 {completedCount}개를 완료했어요.
            </p>
          </div>
          <strong className="text-[44px] leading-none font-bold text-[#4f46e5]">
            {completionRate}%
          </strong>
        </div>
        <div
          role="progressbar"
          aria-label="할 일 완료율"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-6 h-2 overflow-hidden rounded-full bg-[#e7e5ff]"
        >
          <div
            className="h-full rounded-full bg-[#4f46e5] transition-[width]"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {counts.map(({ label, count }) => (
          <div key={label} className="rounded-[8px] border border-[#e5e5e5] p-4">
            <p className="text-sm text-[#767676]">{label}</p>
            <p className="mt-1 text-[30px] leading-none font-bold text-[#111]">
              {count}
              <span className="ml-1 text-sm font-normal text-[#767676]">개</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function navLinkClassName({ isActive }) {
  return `border-b-2 px-1 py-3 text-sm font-medium ${isActive ? 'border-[#4f46e5] text-[#4f46e5]' : 'border-transparent text-[#767676]'}`;
}

function App() {
  const isCompletedPage = useLocation().pathname === '/completed';

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[536px] p-2 font-['Noto_Sans_KR',sans-serif]">
        <div className="flex flex-col gap-5">
          <header className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-[40px] leading-[60px] font-extrabold tracking-[-0.5px] text-[#111]">
                TodoMatic
              </h1>
              <Link
                to={isCompletedPage ? '/' : '/completed'}
                className="shrink-0 text-[16px] leading-[20.4px] font-semibold text-[#4f46e5]"
              >
                {isCompletedPage ? '← 할 일 목록' : '완료 목록 →'}
              </Link>
            </div>
            {!isCompletedPage && (
              <nav aria-label="페이지 이동" className="mt-3 flex gap-5 border-b border-[#e5e5e5]">
                <NavLink to="/" end className={navLinkClassName}>
                  할 일 목록
                </NavLink>
                <NavLink to="/stats" className={navLinkClassName}>
                  통계
                </NavLink>
              </nav>
            )}
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
