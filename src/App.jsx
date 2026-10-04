import { useState } from 'react';
import Button from './components/Button.jsx';
import Input from './components/Input.jsx';
import TodoItem from './components/TodoItem.jsx';

const initialTodos = [
  { id: 'eat', text: '밥 먹기', completed: false },
  { id: 'attendance', text: '리츠 출석하기', completed: true },
  { id: 'sleep', text: '잠자기', completed: false },
];

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료됨' },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  function addTodo(event) {
    event.preventDefault();
    const text = newTodo.trim();
    if (!text) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
    setNewTodo('');
  }

  function updateTodo(id, changes) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo)),
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[536px] p-2 font-['Noto_Sans_KR',sans-serif]">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col items-start gap-4">
            <h1 className="text-[40px] leading-[60px] font-extrabold tracking-[-0.5px] text-[#111]">
              TodoMatic
            </h1>
            <p className="text-xl leading-[26.4px] font-medium text-[#222]">할 일을 입력하세요</p>
          </header>

          <section aria-label="할 일 입력과 필터" className="flex flex-col items-start gap-2">
            <form onSubmit={addTodo} className="flex w-full gap-2">
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
              {filter === 'completed'
                ? `완료한 할 일 ${completedCount}개`
                : `남은 할 일 ${remainingCount}개`}
            </h2>
            {visibleTodos.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {visibleTodos.map((todo) => (
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
            ) : (
              <p className="py-4 text-[#767676]">표시할 할 일이 없습니다.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
