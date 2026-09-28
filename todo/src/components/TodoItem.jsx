import { useState } from 'react';
import Checkbox from './common/Checkbox';
import Input from './common/Input';
import Button from './common/Button';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const startEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item">
        <form className="todo-item__edit" onSubmit={handleSave}>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="할 일 수정"
          />
          <div className="todo-item__actions">
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button type="submit" variant="primary">
              저장
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} label={todo.text} />
      <div className="todo-item__actions">
        <Button onClick={startEdit}>수정</Button>
        <Button variant="danger" onClick={() => onDelete(todo.id)}>
          삭제
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
