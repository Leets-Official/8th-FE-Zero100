import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/dashboard/Button.jsx';
import Card from '../../components/dashboard/Card.jsx';
import PageTitle from '../../components/dashboard/PageTitle.jsx';
import TextArea from '../../components/dashboard/TextArea.jsx';
import TextInput from '../../components/dashboard/TextInput.jsx';
import { validateEmail } from '../../utils/dashboard/validation.js';

const INQUIRY_LIST_PATH = '/dashboard/inquiries';

function validateInquiryForm({ name, email, title, content }) {
  return {
    name: name.trim() ? '' : '이름을 입력하세요',
    email: validateEmail(email),
    title: title.trim() ? '' : '제목을 입력하세요',
    content: content.trim() ? '' : '내용을 입력하세요',
  };
}

function InquiryCreatePage({ onAddInquiry }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', title: '', content: '' });
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors) setErrors(validateInquiryForm(nextValues));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateInquiryForm(values);
    setErrors(nextErrors);

    // 오류가 있으면 첫 번째 오류 입력 필드로 포커스를 이동
    const firstInvalidField = Object.keys(nextErrors).find((field) => nextErrors[field]);
    if (firstInvalidField) {
      event.currentTarget.elements.namedItem(firstInvalidField).focus();
      return;
    }

    await onAddInquiry({
      name: values.name.trim(),
      email: values.email.trim(),
      title: values.title.trim(),
      content: values.content.trim(),
    });
    navigate(INQUIRY_LIST_PATH);
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
          <div className="flex flex-row items-center justify-end gap-[12px] h-[53.8px]">
            <Button variant="secondary" onClick={() => navigate(INQUIRY_LIST_PATH)}>
              취소
            </Button>
            <Button type="submit">등록</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default InquiryCreatePage;
