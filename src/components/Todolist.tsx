// src/components/TodoItem.tsx
import { Text } from './Text';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todo, onToggle, onDelete }: TodoListProps) {
  return (
    <li
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
          onChange={() => onToggle(todo.id)}
        />
        <Text done={todo.completed}>{todo.text}</Text>
      </div>
      <Button onClick={() => onDelete(todo.id)} danger>
        삭제
      </Button>
    </li>
  );
}