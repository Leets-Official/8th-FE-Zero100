import { useState } from 'react';
import Button from '../Button/Button.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  // 편집 중인지와 입력 중인 값은 이 Todo 하나에만 필요하므로 TodoItem 안에서 관리한다.
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const itemClassName = todo.completed ? 'todo-item todo-item-completed' : 'todo-item';

  const handleStartEdit = () => {
    setEditValue(todo.title);
    setIsEditing(true);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    const title = editValue.trim();
    if (!title) return;

    onEdit(todo.id, title);
    setIsEditing(false);
  };

  return (
    <li className={itemClassName}>
      <div className="todo-content">
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)}>
          {!isEditing && <span className="todo-title">{todo.title}</span>}
        </Checkbox>
        {isEditing && (
          <form onSubmit={handleSaveEdit}>
            <input
              type="text"
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
              autoFocus
            />
          </form>
        )}
      </div>
      <div className="todo-actions">
        <Button
          variant="secondary"
          className="todo-action-button todo-edit-button"
          onClick={isEditing ? handleSaveEdit : handleStartEdit}
        >
          {isEditing ? '저장' : '수정'}
        </Button>
        <Button variant="danger" className="todo-action-button" onClick={() => onDelete(todo.id)}>
          삭제
        </Button>
      </div>
    </li>
  );
}

export default TodoItem;
