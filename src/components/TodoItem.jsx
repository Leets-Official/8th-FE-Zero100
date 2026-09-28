import { useState } from 'react';
import Button from './Button.jsx';
import Checkbox from './Checkbox.jsx';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const titleStateClassName = todo.completed
    ? 'text-[#999999] line-through'
    : 'text-[color:var(--color-text-primary)] no-underline';

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
    <li className="box-border flex flex-col gap-[8px] w-[520px] py-[14px] px-[16px] border-[1px] border-solid border-[#eeeeee] rounded-[8px] bg-[#ffffff]">
      <div className="flex flex-row self-stretch items-center gap-[10px]">
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)}>
          {!isEditing && (
            <span
              className={`font-[family-name:var(--font-family-base)] font-medium text-[16px] leading-[22.8px] tracking-[0px] min-w-0 wrap-anywhere ${titleStateClassName}`}
            >
              {todo.title}
            </span>
          )}
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
      <div className="flex flex-row justify-start items-center gap-[8px] pl-[calc(var(--checkbox-size)_+_var(--checkbox-gap))]">
        <Button
          variant="secondary"
          className="inline-flex items-center justify-center min-w-[74px] h-[44px] px-[20px] py-[0px] font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-none tracking-[0] text-[#555555]"
          onClick={isEditing ? handleSaveEdit : handleStartEdit}
        >
          {isEditing ? '저장' : '수정'}
        </Button>
        <Button
          variant="danger"
          className="inline-flex items-center justify-center min-w-[74px] h-[44px] px-[20px] py-[0px] font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-none tracking-[0]"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </Button>
      </div>
    </li>
  );
}

export default TodoItem;
