import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import { useTodos } from '../../hooks/useTodos';
import { DeleteModalContext } from './DeleteModalContext';

function DeleteModalProvider({ children }) {
  const { deleteTodo } = useTodos();
  // 삭제하려는 할 일이 있으면 모달이 열린 상태로 본다.
  // 모달을 연 버튼(trigger)도 같이 기억해 두었다가, 취소하면 그 버튼으로 포커스를 돌려준다.
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openDeleteModal = (todo) => setDeleteTarget({ todo, trigger: document.activeElement });

  const closeDeleteModal = () => {
    deleteTarget?.trigger?.focus();
    setDeleteTarget(null);
  };

  const confirmDelete = () => {
    // 삭제하면 버튼도 같이 사라지므로 포커스를 돌려줄 곳이 없다.
    deleteTodo(deleteTarget.todo.id);
    setDeleteTarget(null);
  };

  return (
    <DeleteModalContext value={{ openDeleteModal }}>
      {children}

      {deleteTarget && (
        <Modal title="할 일을 삭제하겠습니까?" onClose={closeDeleteModal}>
          <p className="mt-1.5 text-sm text-ink-muted">"{deleteTarget.todo.text}"</p>
          <div className="mt-5 flex justify-end gap-2">
            {/* 실수로 Enter를 눌러도 지워지지 않도록 취소 버튼에 먼저 포커스를 둔다. */}
            <Button variant="secondary" size="sm" onClick={closeDeleteModal} autoFocus>
              취소
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDelete}>
              삭제
            </Button>
          </div>
        </Modal>
      )}
    </DeleteModalContext>
  );
}

export default DeleteModalProvider;
