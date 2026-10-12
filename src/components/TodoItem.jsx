import { useId, useState } from 'react';
import Button from './Button.jsx';
import Checkbox from './Checkbox.jsx';
import DeleteConfirmDialog from './DeleteConfirmDialog.jsx';
import Input from './Input.jsx';

function TodoItem({ text, completed, onToggle, onUpdate, onDelete }) {
  const errorId = useId();
  const [draft, setDraft] = useState(text);
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function startEditing() {
    setDraft(text);
    setEditError(false);
    setEditing(true);
  }

  function saveEditing() {
    const nextText = draft.trim();
    if (!nextText) {
      setEditError(true);
      return;
    }
    onUpdate(nextText);
    setEditError(false);
    setEditing(false);
  }

  function cancelEditing() {
    setDraft(text);
    setEditError(false);
    setEditing(false);
  }

  return (
    <li className="flex w-full max-w-[520px] flex-col items-start gap-2 rounded-lg border border-[#eee] bg-white px-4 py-3.5">
      <div className="flex w-full items-center gap-2.5">
        <Checkbox
          checked={completed}
          onChange={(event) => onToggle(event.target.checked)}
          aria-label={`${text} 완료 여부`}
        />
        {editing ? (
          <Input
            variant="compact"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              if (event.target.value.trim()) setEditError(false);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') saveEditing();
              if (event.key === 'Escape') cancelEditing();
            }}
            aria-label="할 일 수정"
            aria-invalid={editError}
            aria-describedby={editError ? errorId : undefined}
          />
        ) : (
          <span
            className={`font-['Noto_Sans_KR',sans-serif] text-base leading-[22.8px] font-medium ${completed ? 'text-[#999] line-through' : 'text-[#111]'}`}
          >
            {text}
          </span>
        )}
      </div>
      {editing && editError && (
        <p id={errorId} role="alert" className="pl-[27px] text-sm text-red-600">
          내용을 입력해주세요!
        </p>
      )}
      <div className="flex w-full gap-1.5 pl-[27px]">
        {editing ? (
          <>
            <Button variant="secondary" onClick={saveEditing}>
              저장
            </Button>
            <Button variant="secondary" onClick={cancelEditing}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={startEditing}>
              수정
            </Button>
            <Button variant="danger" onClick={() => setConfirmingDelete(true)}>
              삭제
            </Button>
          </>
        )}
      </div>
      {confirmingDelete && (
        <DeleteConfirmDialog
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            setConfirmingDelete(false);
            onDelete();
          }}
        />
      )}
    </li>
  );
}

export default TodoItem;
