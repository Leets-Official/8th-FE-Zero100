import Checkbox from '../Checkbox/Checkbox';
import TodoText from '../TodoText/TodoText';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import './TodoItem.css';
import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  function handleStartEdit() {
    setEditValue(todo.text);
    setIsEditing(true);
  }

  function handleCancel() {
    setEditValue(todo.text);
    setIsEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();

    const text = editValue.trim();
    if (!text) return;

    onEdit(todo.id, text);
    setIsEditing(false);
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <form
          onSubmit={handleSave}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === 'Escape') handleCancel();
          }}
        >
          <div className="todo-item__content">
            <Checkbox
              label={`${todo.text} 완료`}
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              disabled={true}
            />

            <Input
              label="할 일 수정"
              size="compact"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          </div>

          <div className="todo-item__actions">
            <Button type="submit" variant="secondary" disabled={!editValue.trim()}>
              저장
            </Button>

            <Button variant="secondary" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-item__content">
            <Checkbox
              id={`todo-${todo.id}`}
              label={`${todo.text} 완료`}
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />

            <TodoText htmlFor={`todo-${todo.id}`} completed={todo.completed}>
              {todo.text}
            </TodoText>
          </div>

          <div className="todo-item__actions" role="group" aria-label={`${todo.text} 관리`}>
            <Button variant="secondary" onClick={handleStartEdit}>
              수정
            </Button>

            <Modal>
              <Modal.Trigger>삭제</Modal.Trigger>

              <Modal.Content>
                <Modal.Title>할 일을 삭제하겠습니까?</Modal.Title>

                <Modal.Actions>
                  <Modal.Close>취소</Modal.Close>

                  <Modal.Confirm onConfirm={() => onDelete(todo.id)}>삭제</Modal.Confirm>
                </Modal.Actions>
              </Modal.Content>
            </Modal>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
