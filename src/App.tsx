import { useState } from 'react';
import { Text } from './components/Text';
import { Button } from './components/Button';
import { Checkbox } from './components/Checkbox';
import { Input } from './components/Input';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

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

  return (
    <div style={{ maxWidth: '360px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Zero100 Todo List</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Input
          value={input}
          onChange={setInput}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo}>추가</Button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <Text done={todo.completed}>{todo.text}</Text>
            </div>
            <Button onClick={() => deleteTodo(todo.id)} danger>
              삭제
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}