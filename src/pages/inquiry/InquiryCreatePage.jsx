import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import TextField from '../../components/dashboard/TextField';
import { ROUTES } from '../../constants/routes';
import { validateEmail, validateName } from '../../utils/validators';

const validators = {
  name: validateName,
  email: validateEmail,
  title: (value) => (value.trim() ? '' : '제목을 입력하세요'),
  content: (value) => (value.trim() ? '' : '내용을 입력하세요'),
};

function InquiryCreatePage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', title: '', content: '' });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {
      name: validators.name(values.name),
      email: validators.email(values.email),
      title: validators.title(values.title),
      content: validators.content(values.content),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    // TODO: API 연동 후 문의 등록 요청
    navigate(ROUTES.INQUIRY);
  }

  return (
    <div className="mx-auto flex w-full max-w-[678px] flex-col gap-5">
      <h1 className="text-2xl leading-8 font-bold text-black">문의 등록</h1>
      <form
        className="flex flex-col gap-4 rounded-[10px] bg-white p-6 outline -outline-offset-1 outline-gray-200"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          name="name"
          label="이름"
          placeholder="이름을 입력하세요"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          name="title"
          label="제목"
          placeholder="제목을 입력하세요"
          value={values.title}
          onChange={handleChange}
          error={errors.title}
        />
        <TextField
          multiline
          name="content"
          label="내용"
          placeholder="내용을 입력하세요"
          value={values.content}
          onChange={handleChange}
          error={errors.content}
        />
        <div className="flex h-14 items-center justify-end gap-3">
          <Button variant="secondary" onClick={() => navigate(ROUTES.INQUIRY)}>
            취소
          </Button>
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
}

export default InquiryCreatePage;
