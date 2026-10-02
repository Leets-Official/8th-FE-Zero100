import { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Text from '../../common/Text/Text';
import styles from './TodoForm.module.css';

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <Text as="label" variant="heading" htmlFor={INPUT_ID}>
        할 일을 입력하세요
      </Text>
      <div className={styles.inputRow}>
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
      </div>
    </form>
  );
}

export default TodoForm;
