import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
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
          <>
            <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />

            <div className="edit-input-wrapper">
              <Input
                value={editingText}
                onChange={onEditingTextChange}
                onKeyDown={(event) => onEditKeyDown(event, todo.id)}
                aria-label="할 일 수정"
                placeholder="수정할 할 일을 입력하세요"
                autoFocus
              />
            </div>
          </>
        ) : (
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} label={todo.text} />
        )}
      </div>

      <div className="todo-card-buttons">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={() => onSaveEdit(todo.id)}>
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

            <Modal>
              <Modal.Trigger>
                <Button variant="danger">삭제</Button>
              </Modal.Trigger>

              <Modal.Backdrop />

              <Modal.Content>
                <h2>할 일을 삭제하시겠습니까?</h2>

                <div className="modal-actions">
                  <Modal.Close>
                    {(closeModal) => (
                      <Button variant="secondary" onClick={closeModal}>
                        취소
                      </Button>
                    )}
                  </Modal.Close>

                  <Modal.Close>
                    {(closeModal) => (
                      <Button
                        variant="danger"
                        onClick={() => {
                          onDelete(todo.id);
                          closeModal();
                        }}
                      >
                        삭제
                      </Button>
                    )}
                  </Modal.Close>
                </div>
              </Modal.Content>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
