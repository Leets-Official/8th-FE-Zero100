import { useState } from 'react';
import Button from './Button';

function Input(props) {
  const [inputValue, setInputValue] = useState('');

  const addWork = () => {
    if (inputValue.trim() === '') return;
    props.newWork(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="h-11 flex-1 rounded-md border border-[#ccc] bg-white px-3.5 text-base text-[#111] placeholder:text-[#111]/50 focus:border-indigo-600 focus:outline-none"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="새 할 일 추가"
      />

      <Button variant="primary" onClick={addWork}>
        추가
      </Button>
    </div>
  );
}

export default Input;
