import { useState } from 'react';
import { Link } from 'react-router';

import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import Textarea from '../components/dashboard/Textarea';
import { ROUTES } from '../constants/routes';

const INITIAL_VALUES = {
  name: '',
  email: '',
  title: '',
  content: '',
};

function validateField(name, value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    const messages = {
      name: '이름을 입력해주세요.',
      email: '이메일을 입력해주세요.',
      title: '제목을 입력해주세요.',
      content: '내용을 입력해주세요.',
    };

    return messages[name] ?? '';
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return '올바른 이메일 형식을 입력하세요.';
  }

  return '';
}

function InquiryCreatePage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setNotice('');
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      title: validateField('title', values.title),
      content: validateField('content', values.content),
    };

    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors).find((name) => nextErrors[name]);

    if (firstInvalidField) {
      setNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    setNotice('문의 등록 기능은 API 연동 후 이용할 수 있습니다.');
  }

  return (
    <section
      aria-labelledby="inquiry-create-title"
      className="mx-auto flex w-full max-w-[572px] flex-col gap-[24px]"
    >
      <h2 id="inquiry-create-title" className="text-[24px] leading-[32px] font-bold text-[#000000]">
        문의 등록
      </h2>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-[16px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] p-[24px]"
      >
        <Input
          label="이름"
          name="name"
          autoComplete="name"
          placeholder="이름을 입력하세요"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <Input
          label="이메일"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="이메일을 입력하세요"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <Input
          label="제목"
          name="title"
          placeholder="제목을 입력하세요"
          value={values.title}
          error={errors.title}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <Textarea
          label="내용"
          name="content"
          placeholder="내용을 입력하세요"
          value={values.content}
          error={errors.content}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <div className="mt-[4px] flex justify-end gap-[12px]">
          <Link
            to={ROUTES.INQUIRIES}
            className="inline-flex items-center justify-center rounded-[10px] bg-[#FFFFFF] px-[20px] py-[10px] text-[14px] leading-[20px] font-medium text-[#364153] shadow-[inset_0_0_0_0.93px_#E5E7EB] hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#364153]"
          >
            취소
          </Link>

          <Button type="submit" size="small">
            등록
          </Button>
        </div>

        <div role="status" aria-atomic="true" className={notice ? '' : 'sr-only'}>
          {notice && <p className="text-[12px] leading-[20px] text-[#4A5565]">{notice}</p>}
        </div>
      </form>
    </section>
  );
}

export default InquiryCreatePage;
