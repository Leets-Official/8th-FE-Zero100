import './TodoForm.css';
import { useRef, useState } from 'react';
import Text from '../commons/Text';
import Input from '../commons/Input';
import Button from '../commons/Button';

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const text = value.trim();
    if (!text) {
      setError('공백이 아닌 할 일을 입력해 주세요.');
      inputRef.current?.focus();
      return;
    }
    onAdd(text);
    setValue('');
    setError('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <Text as="label" htmlFor="new-todo" className="form-label">
        할 일을 입력하세요
      </Text>
      <div className="input-row">
        <Input
          ref={inputRef}
          id="new-todo"
          value={value}
          maxLength={120}
          placeholder="새 할 일 추가"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'add-error' : undefined}
          onChange={(event) => {
            setValue(event.target.value);
            setError('');
          }}
        />
        <Button type="submit" variant="primary">
          추가
        </Button>
      </div>
      {error && (
        <Text id="add-error" role="alert" className="error">
          {error}
        </Text>
      )}
    </form>
  );
}
