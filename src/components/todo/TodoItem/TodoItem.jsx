import { useState } from 'react';
import Button from '../../common/Button/Button';
import Checkbox from '../../common/Checkbox/Checkbox';
import Input from '../../common/Input/Input';
import Text from '../../common/Text/Text';
import { isEnterKey } from '../../../utils/isEnterKey';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);
  const trimmedEditingText = editingText.trim();

  const startEditing = () => {
    setEditingText(todo.text);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditingText(todo.text);
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (!trimmedEditingText) return;

    onEditTodo(todo.id, trimmedEditingText);
    setIsEditing(false);
  };

  const handleEditKeyDown = (event) => {
    if (isEnterKey(event)) saveEditing();
    if (event.key === 'Escape') cancelEditing();
  };

  return (
    <li className={styles.card}>
      <div className={styles.content}>
        {isEditing ? (
          <Input
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
            onKeyDown={handleEditKeyDown}
            aria-label={`"${todo.text}" 수정`}
            autoFocus
          />
        ) : (
          <Checkbox checked={todo.isCompleted} onChange={() => onToggleTodo(todo.id)}>
            <Text as="span" isStrikethrough={todo.isCompleted}>
              {todo.text}
            </Text>
          </Checkbox>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <Button onClick={saveEditing} disabled={!trimmedEditingText}>
              저장
            </Button>
            <Button variant="secondary" onClick={cancelEditing}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={startEditing}
              aria-label={`"${todo.text}" 수정하기`}
            >
              수정
            </Button>
            <Button
              variant="danger"
              onClick={() => onDeleteTodo(todo.id)}
              aria-label={`"${todo.text}" 삭제하기`}
            >
              삭제
            </Button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
