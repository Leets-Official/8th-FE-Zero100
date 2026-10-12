import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';
import Text from '../common/Text.jsx';

function DeleteTodoModal({ todo, onCancel, onConfirm }) {
  return (
    <Modal title="할 일을 삭제하겠습니까?" onClose={onCancel}>
      <Text as="p" className="modal__description">
        “{todo.title}” 항목이 목록에서 삭제됩니다.
      </Text>
      <div className="modal__actions">
        <Button onClick={onCancel} autoFocus>
          취소
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          삭제
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteTodoModal;
