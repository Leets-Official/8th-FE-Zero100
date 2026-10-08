import { useRef, useState } from 'react';
import Button from '../../common/Button/Button';
import Checkbox from '../../common/Checkbox/Checkbox';
import Input from '../../common/Input/Input';
import Text from '../../common/Text/Text';
import { useDeleteModal } from '../../../hooks/useDeleteModal';
import { useTodos } from '../../../hooks/useTodos';
import { isEnterKey } from '../../../utils/isEnterKey';

function TodoItem({ todo }) {
  const { toggleTodo, editTodo } = useTodos();
  const { openDeleteModal } = useDeleteModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);
  const trimmedEditingText = editingText.trim();
  // 저장/취소로 입력창이 사라질 때 포커스를 잃지 않도록, 다시 나타나는 수정 버튼으로 포커스를 옮긴다.
  const shouldFocusEditButtonRef = useRef(false);

  const startEditing = () => {
    setEditingText(todo.text);
    setIsEditing(true);
  };

  const finishEditing = () => {
    shouldFocusEditButtonRef.current = true;
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setEditingText(todo.text);
    finishEditing();
  };

  const saveEditing = () => {
    if (!trimmedEditingText) return;

    editTodo(todo.id, trimmedEditingText);
    finishEditing();
  };

  const focusEditButtonAfterEditing = (button) => {
    if (!button || !shouldFocusEditButtonRef.current) return;

    button.focus();
    shouldFocusEditButtonRef.current = false;
  };

  const handleEditKeyDown = (event) => {
    if (isEnterKey(event)) {
      // 기본 동작을 막지 않으면, 같은 Enter가 포커스를 받은 수정 버튼까지 눌러 다시 수정 모드가 된다.
      event.preventDefault();
      saveEditing();
    }
    if (event.key === 'Escape') cancelEditing();
  };

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-line-card bg-white p-4">
      <div className="flex min-h-11 items-center">
        {isEditing ? (
          <Input
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
            onKeyDown={handleEditKeyDown}
            aria-label={`"${todo.text}" 수정`}
            autoFocus
          />
        ) : (
          <Checkbox checked={todo.isCompleted} onChange={() => toggleTodo(todo.id)}>
            <Text as="span" isStrikethrough={todo.isCompleted}>
              {todo.text}
            </Text>
          </Checkbox>
        )}
      </div>

      <div className="flex gap-2 pl-[30px]">
        {isEditing ? (
          <>
            <Button size="item" onClick={saveEditing} disabled={!trimmedEditingText}>
              저장
            </Button>
            <Button variant="secondary" size="item" onClick={cancelEditing}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button
              size="item"
              ref={focusEditButtonAfterEditing}
              variant="secondary"
              onClick={startEditing}
              aria-label={`"${todo.text}" 수정하기`}
            >
              수정
            </Button>
            <Button
              size="item"
              variant="danger"
              onClick={() => openDeleteModal(todo)}
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
