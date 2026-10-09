import { useEffect, useState } from 'react';
import { TodoItem, type Todo } from '../components/TodoItem';

const initialTodos: Todo[] = [
  { id: 1, text: '대시보드 프로젝트 확인하기', completed: false },
  { id: 2, text: '피그마 디자인 확인하기', completed: false },
  { id: 3, text: '문의 기능 테스트하기', completed: true },
];

const STORAGE_KEY = 'todos';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);

      if (savedTodos !== null) {
        const parsedTodos: unknown = JSON.parse(savedTodos);

        if (Array.isArray(parsedTodos)) {
          return parsedTodos as Todo[];
        }
      }
    } catch {
      console.error('할 일 목록을 불러오지 못했습니다.');
    }

    return initialTodos;
  });

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      console.error('할 일 목록을 저장하지 못했습니다.');
    }
  }, [todos]);

  const handleToggle = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((current) =>
      current.filter((todo) => todo.id !== id)
    );
  };

  const handleEdit = (id: number, text: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  const handleAdd = () => {
    const text = newTodo.trim();

    if (!text) return;

    setTodos((current) => [
      ...current,
      { id: Date.now(), text, completed: false },
    ]);

    setNewTodo('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          TodoList
        </h1>

        <p className="mb-8 text-gray-500">
          오늘 해야 할 일을 확인해 보세요.
        </p>

        <div className="mb-6 flex gap-2">
          <input
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleAdd();
            }}
            placeholder="새로운 할 일을 입력하세요"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            추가
          </button>
        </div>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              할 일 목록
            </h2>

            <span className="text-sm text-gray-500">
              완료 {todos.filter((todo) => todo.completed).length} / {todos.length}
            </span>
          </div>

          {todos.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              등록된 할 일이 없어요.
            </p>
          ) : (
            <ul>
              {todos.map((todo) => (
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
      </div>
    </div>
  );
}

