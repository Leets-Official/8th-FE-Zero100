import { useState } from 'react';
import Button from './Button.jsx';
import Checkbox from './Checkbox.jsx';
import Input from './Input.jsx';

function TodoItem({ text, completed, onToggle, onUpdate, onDelete }) {
  const [draft, setDraft] = useState(text);
  const [editing, setEditing] = useState(false);

  function startEditing() {
    setDraft(text);
    setEditing(true);
  }

  function saveEditing() {
    const nextText = draft.trim();
    if (!nextText) return;
    onUpdate(nextText);
    setEditing(false);
  }

  function cancelEditing() {
    setDraft(text);
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
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') saveEditing();
              if (event.key === 'Escape') cancelEditing();
            }}
            aria-label="할 일 수정"
          />
        ) : (
          <span
            className={`font-['Noto_Sans_KR',sans-serif] text-base leading-[22.8px] font-medium ${completed ? 'text-[#999] line-through' : 'text-[#111]'}`}
          >
            {text}
          </span>
        )}
      </div>
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
            <Button variant="danger" onClick={onDelete}>
              삭제
            </Button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
