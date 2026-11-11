import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDashboard } from '../hooks/useDashboard.js';
import Button from '../components/common/Button.jsx';
import LinkButton from '../components/common/LinkButton.jsx';
import TextInput from '../components/common/TextInput.jsx';
import TextArea from '../components/common/TextArea.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';
import { getApiError } from '../api/client.js';
import { validateInquiryField } from '../utils/validation.js';

function InquiryCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [pending, setPending] = useState(false);
  const { addInquiry, data } = useDashboard();
  const [authorName, setAuthorName] = useState(data.profile.name);
  const [authorEmail, setAuthorEmail] = useState(data.profile.email);
  const navigate = useNavigate();

  function validateField(name, value) {
    setFieldErrors((current) => ({ ...current, [name]: validateInquiryField(name, value) }));
  }

  function clearFieldError(name) {
    setFieldErrors((current) => ({ ...current, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const values = { authorName, authorEmail, title, content };
    const nextErrors = Object.fromEntries(
      Object.entries(values).map(([name, value]) => [name, validateInquiryField(name, value)]),
    );
    setFieldErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors).find((name) => nextErrors[name]);
    if (firstInvalid) {
      event.currentTarget.elements.namedItem(firstInvalid)?.focus();
      return;
    }
    setPending(true);
    try {
      await addInquiry({ title, content, authorName, authorEmail });
      navigate('/inquiries');
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <PageHeading title="문의 등록" />
      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-3xl space-y-6 rounded-lg border border-line bg-white p-6 sm:p-8"
      >
        <TextInput
          label="이름"
          name="authorName"
          value={authorName}
          onChange={(event) => {
            setAuthorName(event.target.value);
            clearFieldError('authorName');
          }}
          onBlur={(event) => validateField('authorName', event.target.value)}
          error={fieldErrors.authorName}
          maxLength={20}
          required
        />
        <TextInput
          label="이메일"
          name="authorEmail"
          type="email"
          value={authorEmail}
          onChange={(event) => {
            setAuthorEmail(event.target.value);
            clearFieldError('authorEmail');
          }}
          onBlur={(event) => validateField('authorEmail', event.target.value)}
          error={fieldErrors.authorEmail}
          required
        />
        <TextInput
          label="제목"
          name="title"
          placeholder="문의 제목을 입력해 주세요"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            clearFieldError('title');
          }}
          onBlur={(event) => validateField('title', event.target.value)}
          error={fieldErrors.title}
          maxLength={50}
          required
        />
        <TextArea
          label="내용"
          name="content"
          placeholder="문의 내용을 입력해 주세요"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            clearFieldError('content');
          }}
          onBlur={(event) => validateField('content', event.target.value)}
          error={fieldErrors.content}
          maxLength={2000}
          helperText={`${content.length} / 2,000자`}
          rows={10}
          required
        />
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <LinkButton to="/inquiries" variant="secondary">
            취소
          </LinkButton>
          <Button type="submit" isLoading={pending}>
            등록
          </Button>
        </div>
      </form>
    </>
  );
}

export default InquiryCreatePage;
