import './TodoItem.css';
import { useRef, useState } from 'react';
import Button from '../commons/Button';
import Checkbox from '../commons/Checkbox';
import Input from '../commons/Input';
import Text from '../commons/Text';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [error, setError] = useState('');
  const editButtonRef = useRef(null);

  function closeEditor() {
    setIsEditing(false);
    setError('');
    requestAnimationFrame(() => editButtonRef.current?.focus());
  }

  function handleSave(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      setError('공백이 아닌 할 일을 입력해 주세요.');
      return;
    }
    onEdit(todo.id, text);
    closeEditor();
  }

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      {isEditing ? (
        <form
          onSubmit={handleSave}
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeEditor();
          }}
        >
          <Text as="label" htmlFor={`edit-${todo.id}`} className="edit-label">
            할 일 수정
          </Text>
          <Input
            id={`edit-${todo.id}`}
            value={draft}
            maxLength={120}
            autoFocus
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `error-${todo.id}` : undefined}
            onChange={(event) => {
              setDraft(event.target.value);
              setError('');
            }}
          />
          {error && (
            <Text id={`error-${todo.id}`} role="alert" className="error">
              {error}
            </Text>
          )}
          <div className="item-actions">
            <Button type="submit" variant="primary">
              저장
            </Button>
            <Button onClick={closeEditor}>취소</Button>
          </div>
        </form>
      ) : (
        <>
          <Checkbox
            id={`todo-${todo.id}`}
            label={todo.text}
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <div className="item-actions item-actions--indented">
            <Button
              ref={editButtonRef}
              aria-label={`${todo.text} 수정`}
              onClick={() => {
                setDraft(todo.text);
                setError('');
                setIsEditing(true);
              }}
            >
              수정
            </Button>
            <Button
              variant="danger"
              aria-label={`${todo.text} 삭제`}
              onClick={() => onDelete(todo.id)}
            >
              삭제
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
