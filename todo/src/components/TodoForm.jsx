import { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="새 할 일 추가" />
      <Button type="submit" variant="primary">
        추가
      </Button>
    </form>
  );
};

export default TodoForm;
