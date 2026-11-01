import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = '이름을 입력하세요';
  if (!form.email.trim()) {
    errors.email = '이메일을 입력하세요';
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = '올바른 이메일 형식을 입력하세요';
  }
  if (!form.title.trim()) errors.title = '제목을 입력하세요';
  if (!form.content.trim()) errors.content = '내용을 입력하세요';
  return errors;
};

const InquiryCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', title: '', content: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    // 문의 등록 API 연동은 다음 단계에서 구현
    navigate('/inquiries');
  };

  return (
    <div className="mx-auto flex w-full max-w-[678px] flex-col gap-5">
      <h2 className="text-2xl font-bold text-black">문의 등록</h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 rounded-[10px] border border-[#E5E7EB] bg-white p-6"
      >
        <TextInput
          label="이름"
          name="name"
          placeholder="이름을 입력하세요"
          value={form.name}
          onChange={handleChange}
          errorText={errors.name}
        />
        <TextInput
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          value={form.email}
          onChange={handleChange}
          errorText={errors.email}
        />
        <TextInput
          label="제목"
          name="title"
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={handleChange}
          errorText={errors.title}
        />
        <TextArea
          label="내용"
          name="content"
          placeholder="내용을 입력하세요"
          value={form.content}
          onChange={handleChange}
          errorText={errors.content}
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="small" onClick={() => navigate('/inquiries')}>
            취소
          </Button>
          <Button type="submit" size="small">
            등록
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InquiryCreatePage;
