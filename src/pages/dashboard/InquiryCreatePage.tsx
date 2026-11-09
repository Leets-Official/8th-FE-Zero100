import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { getErrorMessage } from '../../api/axiosInstance.ts';
import { createInquiry } from '../../api/inquiryApi.ts';
import Button from '../../components/dashboard/Button.tsx';
import Card from '../../components/dashboard/Card.tsx';
import FormErrorMessage from '../../components/dashboard/FormErrorMessage.tsx';
import PageTitle from '../../components/dashboard/PageTitle.tsx';
import TextArea from '../../components/dashboard/TextArea.tsx';
import TextInput from '../../components/dashboard/TextInput.tsx';
import type { CreateInquiryRequest } from '../../types/inquiry.ts';
import { validateEmail } from '../../utils/dashboard/validation.ts';

const INQUIRY_LIST_PATH = '/dashboard/inquiries';

// 필드별 오류 메시지. 오류가 없으면 빈 문자열
type InquiryFormErrors = Record<keyof CreateInquiryRequest, string>;

// Swagger POST /api/inquiries의 길이 조건(앞뒤 공백 제외)
function validateLength(value: string, label: string, min: number, max: number): string {
  const { length } = value.trim();
  if (length === 0) return `${label}을 입력하세요`;
  return length >= min && length <= max
    ? ''
    : `${label}은 ${min}자 이상 ${max}자 이하로 입력하세요`;
}

function validateInquiryForm({
  name,
  email,
  title,
  content,
}: CreateInquiryRequest): InquiryFormErrors {
  return {
    name: validateLength(name, '이름', 2, 20),
    email: validateEmail(email),
    title: validateLength(title, '제목', 2, 50),
    content: content.trim() ? '' : '내용을 입력하세요',
  };
}

interface InquiryCreatePageProps {
  // 서버 등록이 확인된 뒤 호출 (등록 완료 안내)
  onCreated: () => void;
}

function InquiryCreatePage({ onCreated }: InquiryCreatePageProps) {
  const navigate = useNavigate();
  const [values, setValues] = useState<CreateInquiryRequest>({
    name: '',
    email: '',
    title: '',
    content: '',
  });
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [errors, setErrors] = useState<InquiryFormErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 인증·네트워크·서버 오류 등 등록 요청 실패 메시지. 실패해도 입력값은 유지한다.
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors) setErrors(validateInquiryForm(nextValues));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateInquiryForm(values);
    setErrors(nextErrors);

    // 오류가 있으면 첫 번째 오류 입력 필드로 포커스를 이동
    const firstInvalidField = Object.entries(nextErrors).find(([, fieldError]) => fieldError)?.[0];
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await createInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        title: values.title.trim(),
        content: values.content.trim(),
      });
      // 등록이 확인된 경우에만 이동한다. 목록 페이지가 서버에서 최신 목록을 다시 조회한다.
      onCreated();
      navigate(INQUIRY_LIST_PATH);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="box-border flex flex-col gap-[20px] w-full max-w-[684px] mx-auto lg:pl-[6px]">
      <PageTitle className="mt-[-3.9px] mb-[3.9px]">문의 등록</PageTitle>
      <Card className="min-h-[580.1px] p-[23.07px]">
        <form className="flex flex-col gap-[16px]" noValidate onSubmit={handleSubmit}>
          <TextInput
            name="name"
            label="이름"
            placeholder="이름을 입력하세요"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            error={errors?.name}
          />
          <TextInput
            type="email"
            name="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            error={errors?.email}
          />
          <TextInput
            name="title"
            label="제목"
            placeholder="제목을 입력하세요"
            value={values.title}
            onChange={handleChange}
            error={errors?.title}
          />
          <TextArea
            name="content"
            label="내용"
            placeholder="내용을 입력하세요"
            className="placeholder-shown:pt-[73.18px]"
            value={values.content}
            onChange={handleChange}
            error={errors?.content}
          />
          <FormErrorMessage message={submitError} />
          <div className="flex flex-row items-center justify-end gap-[12px] h-[53.8px]">
            <Button
              variant="secondary"
              onClick={() => navigate(INQUIRY_LIST_PATH)}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? '등록 중...' : '등록'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default InquiryCreatePage;
