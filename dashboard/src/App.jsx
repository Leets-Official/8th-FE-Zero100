import Button from './components/Button';
import TextInput from './components/TextInput';

function App() {
  return (
    <div className="flex w-[630px] flex-col items-start gap-6 p-10">
      <TextInput placeholder="텍스트를 입력하세요" />
      <TextInput
        label="Text Input"
        placeholder="텍스트를 입력하세요"
        helperText="8자 이상, 영문/숫자/특수문자 포함"
      />
      <TextInput
        label="Email Input"
        type="email"
        placeholder="이메일을 입력하세요"
        errorText="올바른 이메일 형식을 입력하세요"
      />
      <Button>Primary Button</Button>
    </div>
  );
}

export default App;
