import { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const INPUT_ID = 'new-todo-input';

function TodoForm({ onAddTodo }) {
  const [inputText, setInputText] = useState('');
  const trimmedText = inputText.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmedText) return;

    onAddTodo(trimmedText);
    setInputText('');
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      {/* 디자인에는 보이지 않지만 스크린리더가 입력창 이름을 읽을 수 있게 라벨을 숨겨 둔다. */}
      <label htmlFor={INPUT_ID} className="sr-only">
        할 일을 입력하세요
      </label>
      <Input
        id={INPUT_ID}
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="새 할 일 추가"
        autoComplete="off"
      />
      <Button type="submit" disabled={!trimmedText}>
        추가
      </Button>
    </form>
  );
}

export default TodoForm;
