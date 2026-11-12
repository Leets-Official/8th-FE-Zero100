import { useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router';

import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import Textarea from '../components/dashboard/Textarea';
import { ROUTES, getInquiryDetailPath } from '../constants/routes';
import { removeAccessToken } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

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

  if (name === 'name' && (trimmedValue.length < 2 || trimmedValue.length > 20)) {
    return '이름은 2자 이상 20자 이하로 입력해주세요.';
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return '올바른 이메일 형식을 입력하세요.';
  }

  if (name === 'title' && (trimmedValue.length < 2 || trimmedValue.length > 50)) {
    return '제목은 2자 이상 50자 이하로 입력해주세요.';
  }

  return '';
}

function InquiryCreatePage() {
  const navigate = useNavigate();
  const { addInquiry } = useOutletContext();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittingRef = useRef(false);

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (submittingRef.current) return;

    const nextErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      title: validateField('title', values.title),
      content: validateField('content', values.content),
    };

    setErrors(nextErrors);
    setNotice('');

    const firstInvalidField = Object.keys(nextErrors).find((name) => nextErrors[name]);

    if (firstInvalidField) {
      setNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const newInquiry = await addInquiry(values);

      navigate(getInquiryDetailPath(newInquiry.id), {
        replace: true,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        removeAccessToken();
        navigate(ROUTES.LOGIN, { replace: true });
        return;
      }

      setNotice(getApiErrorMessage(error, '문의 등록에 실패했습니다. 다시 시도해주세요.'));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
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
        aria-busy={isSubmitting}
        className="flex flex-col gap-[16px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] p-[24px]"
      >
        <fieldset disabled={isSubmitting} className="flex min-w-0 flex-col gap-[16px]">
          <legend className="sr-only">문의 작성</legend>

          <Input
            label="이름"
            name="name"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            helperText="2자 이상 20자 이하"
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
            helperText="2자 이상 50자 이하"
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
            {isSubmitting ? (
              <Button variant="secondary" size="small" disabled>
                취소
              </Button>
            ) : (
              <Link
                to={ROUTES.INQUIRIES}
                className="inline-flex items-center justify-center rounded-[10px] bg-[#FFFFFF] px-[20px] py-[10px] text-[14px] leading-[20px] font-medium text-[#364153] shadow-[inset_0_0_0_0.93px_#E5E7EB] hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#364153]"
              >
                취소
              </Link>
            )}

            <Button type="submit" size="small" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '등록'}
            </Button>
          </div>
        </fieldset>

        <div role="status" aria-atomic="true" className={notice ? '' : 'sr-only'}>
          {notice && <p className="text-[12px] leading-[20px] text-[#364153]">{notice}</p>}
        </div>
      </form>
    </section>
  );
}

export default InquiryCreatePage;
