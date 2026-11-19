import { useState } from 'react';

import { isValidEmail } from '../../utils/validators';
import Button from '../common/Button';
import TextArea from '../common/TextArea';
import TextInput from '../common/TextInput';

import './InquiryForm.css';

const INITIAL_VALUES = { name: '', email: '', title: '', content: '' };

const validate = ({ name, email, title, content }) => ({
  name: name.trim() ? '' : '이름을 입력하세요',
  email: isValidEmail(email) ? '' : '올바른 이메일 형식을 입력하세요',
  title: title.trim() ? '' : '제목을 입력하세요',
  content: content.trim() ? '' : '내용을 입력하세요',
});

const InquiryForm = ({ onSubmit, onCancel, isSubmitting = false, submitError = '' }) => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    onSubmit?.({
      name: values.name.trim(),
      email: values.email.trim(),
      title: values.title.trim(),
      content: values.content.trim(),
    });
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <TextInput
        label="이름"
        name="name"
        placeholder="이름을 입력하세요"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextInput
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일을 입력하세요"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextInput
        label="제목"
        name="title"
        placeholder="제목을 입력하세요"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
      />
      <TextArea
        label="내용"
        name="content"
        placeholder="내용을 입력하세요"
        value={values.content}
        onChange={handleChange}
        error={errors.content}
      />

      {submitError && (
        <span className="common-field__error" role="alert">
          {submitError}
        </span>
      )}

      <div className="inquiry-form__actions">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '등록'}
        </Button>
      </div>
    </form>
  );
};

export default InquiryForm;
