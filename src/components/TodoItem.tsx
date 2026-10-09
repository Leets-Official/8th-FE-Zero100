import { useState } from 'react';
import { Text } from './Text';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Input } from './Input';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editText.trim()) return;

    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
        gap: '8px',
      }}
    >
      {isEditing ? (
        <>
          <Input
            value={editText}
            onChange={setEditText}
          />

          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: 1,
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />

            <Text done={todo.completed}>{todo.text}</Text>
          </div>

          <Button onClick={() => setIsEditing(true)}>
            Edit
          </Button>

          <Button onClick={() => onDelete(todo.id)} danger>
            삭제
          </Button>
        </>
      )}
    </li>
  );
}