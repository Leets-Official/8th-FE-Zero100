// src/App.tsx
import { useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { TodoItem, Todo } from './components/TodoItem';

type FilterType = 'all' | 'active' | 'completed';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // 1. 남은 할 일 개수 (미완료 항목만 필터링해서 개수 세기)
  const activeCount = todos.filter((t) => !t.completed).length;

  // 2. 현재 선택된 필터(전체/진행 중/완료)에 맞춰 보여줄 목록 계산
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: '360px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Zero100 Todo List</h2>

      {/* 입력창 & 추가 버튼 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Input
          value={input}
          onChange={setInput}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo}>추가</Button>
      </div>

      {/* 필터 버튼 & 남은 개수 표시 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button onClick={() => setFilter('all')}>전체</Button>
          <Button onClick={() => setFilter('active')}>진행 중</Button>
          <Button onClick={() => setFilter('completed')}>완료</Button>
        </div>
        <span style={{ fontSize: '14px', color: '#666' }}>
          남은 할 일: {activeCount}개
        </span>
      </div>

      {/* 분리된 TodoItem 컴포넌트 사용 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}