import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import './TodoItem.css';

function TodoItem({
  todo,
  isEditing,
  editingText,
  onEditingTextChange,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditKeyDown,
}) {
  return (
    <div className="todo-card">
      <div className="todo-card-top">
        {isEditing ? (
          <div className="edit-input-wrapper">
            <Input
              value={editingText}
              onChange={onEditingTextChange}
              onKeyDown={(e) => onEditKeyDown(e, todo.id)}
              aria-label="할 일 수정"
              placeholder="수정할 할 일을 입력하세요"
            />
          </div>
        ) : (
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} label={todo.text} />
        )}
      </div>

      <div className="todo-card-buttons">
        {isEditing ? (
          <>
            <Button variant="default" onClick={() => onSaveEdit(todo.id)}>
              저장
            </Button>

            <Button variant="secondary" onClick={onCancelEdit}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => onStartEdit(todo)}>
              수정
            </Button>

            <Button variant="danger" onClick={() => onDelete(todo.id)}>
              삭제
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
