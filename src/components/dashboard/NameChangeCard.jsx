import { useState } from 'react';
import { validateName } from '../../utils/dashboard/validation.js';
import Button from './Button.jsx';
import Card from './Card.jsx';
import TextInput from './TextInput.jsx';

// Figma 마이페이지의 이름 변경 카드
function NameChangeCard({ onChangeName }) {
  const [name, setName] = useState('');
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setName(event.target.value);
    if (error !== null) setError(validateName(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextError = validateName(name);
    setError(nextError);

    if (nextError) {
      event.currentTarget.elements.namedItem('name').focus();
      return;
    }

    const trimmedName = name.trim();
    setName(trimmedName);
    onChangeName(trimmedName);
  };

  return (
    <Card as="section" className="flex flex-col gap-[12px] p-[19.07px]">
      <h2 className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[18px] leading-[28px] tracking-[0px] text-[#000000]">
        이름 변경
      </h2>
      <form className="flex flex-col gap-[12px]" noValidate onSubmit={handleSubmit}>
        <div className="self-end w-full max-w-[630px]">
          <TextInput
            name="name"
            label="이름"
            hideLabel
            placeholder="텍스트를 입력하세요"
            autoComplete="name"
            value={name}
            onChange={handleChange}
            error={error}
          />
        </div>
        <Button type="submit" className="self-end">
          변경
        </Button>
      </form>
    </Card>
  );
}

export default NameChangeCard;
