import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import { createInquiry } from '../api/inquiries';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (form) => {
  const errors = {};
  const nameLength = form.name.trim().length;
  if (nameLength < 2 || nameLength > 20) errors.name = '이름은 2자 이상 20자 이하로 입력하세요';
  if (!form.email.trim()) {
    errors.email = '이메일을 입력하세요';
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = '올바른 이메일 형식을 입력하세요';
  }
  const titleLength = form.title.trim().length;
  if (titleLength < 2 || titleLength > 50) errors.title = '제목은 2자 이상 50자 이하로 입력하세요';
  if (!form.content.trim()) errors.content = '내용을 입력하세요';
  return errors;
};

const InquiryCreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setServerError('');
    setIsSubmitting(true);
    try {
      await createInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        title: form.title.trim(),
        content: form.content,
      });
      navigate('/inquiries', { state: { toast: '문의가 등록되었습니다.' } });
    } catch (error) {
      setServerError(getErrorMessage(error, '문의를 등록하지 못했습니다'));
      setIsSubmitting(false);
    }
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

        {serverError && (
          <p role="alert" className="text-sm text-red-500">
            {serverError}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="small" onClick={() => navigate('/inquiries')}>
            취소
          </Button>
          <Button type="submit" size="small" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InquiryCreatePage;
