import { useState } from 'react';
import Text from './components/Text/Text';
import Button from './components/Button/Button';
import Checkbox from './components/Checkbox/Checkbox';
import Input from './components/Input/Input';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleCompletedChange(event) {
    setIsCompleted(event.target.checked);
  }

  function handleReset() {
    setInputValue('');
    setIsCompleted(false);
  }

  function handleClearInput() {
    setInputValue('');
  }

  return (
    <main className="ui-preview">
      <h1 className="ui-preview__title">공통 UI 컴포넌트</h1>

      <section className="ui-preview__section">
        <h2 className="ui-preview__heading">Input</h2>

        <label htmlFor="preview-todo">할 일을 입력하세요</label>

        <Input
          id="preview-todo"
          label="할 일"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="새 할 일 추가"
        />
      </section>

      <section className="ui-preview__section">
        <h2 className="ui-preview__heading">Checkbox와 Text</h2>

        <div className="ui-preview__item">
          <Checkbox
            label="미리보기 작업 완료"
            checked={isCompleted}
            onChange={handleCompletedChange}
          />

          <Text completed={isCompleted}>{inputValue === '' ? '할 일 미리보기' : inputValue}</Text>
        </div>
      </section>

      <section className="ui-preview__section">
        <h2 className="ui-preview__heading">Button</h2>

        <div className="ui-preview__buttons">
          <Button onClick={handleReset}>초기화</Button>

          <Button variant="secondary" onClick={handleClearInput}>
            입력 지우기
          </Button>

          <Button variant="danger" onClick={handleReset}>
            초기화
          </Button>

          <Button disabled={true}>비활성</Button>
        </div>
      </section>
    </main>
  );
}

export default App;
