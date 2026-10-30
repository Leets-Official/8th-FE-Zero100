import { useState } from 'react';

import Button from '../common/Button';
import TextArea from '../common/TextArea';
import TextInput from '../common/TextInput';

import './InquiryForm.css';

const INITIAL_VALUES = { name: '', email: '', title: '', content: '' };

const InquiryForm = ({ onSubmit, onCancel }) => {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <TextInput
        label="이름"
        name="name"
        placeholder="이름을 입력하세요"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
      />
      <TextInput
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일을 입력하세요"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
      />
      <TextInput
        label="제목"
        name="title"
        placeholder="제목을 입력하세요"
        value={values.title}
        onChange={handleChange}
      />
      <TextArea
        label="내용"
        name="content"
        placeholder="내용을 입력하세요"
        value={values.content}
        onChange={handleChange}
      />

      <div className="inquiry-form__actions">
        <Button variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">등록</Button>
      </div>
    </form>
  );
};

export default InquiryForm;
