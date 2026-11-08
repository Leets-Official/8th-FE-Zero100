import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDashboard } from '../hooks/useDashboard.js';
import Button from '../components/common/Button.jsx';
import LinkButton from '../components/common/LinkButton.jsx';
import TextInput from '../components/common/TextInput.jsx';
import TextArea from '../components/common/TextArea.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';
import { getApiError } from '../api/client.js';

function InquiryCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const { addInquiry, data } = useDashboard();
  const [authorName, setAuthorName] = useState(data.profile.name);
  const [authorEmail, setAuthorEmail] = useState(data.profile.email);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim() || !authorEmail.trim()) return;
    if (title.trim().length < 2 || authorName.trim().length < 2) {
      setError('이름과 제목은 2자 이상 입력해 주세요.');
      return;
    }
    setError('');
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
        className="max-w-3xl space-y-6 rounded-lg border border-line bg-white p-6 sm:p-8"
      >
        <TextInput
          label="이름"
          name="authorName"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          maxLength={20}
          required
        />
        <TextInput
          label="이메일"
          name="authorEmail"
          type="email"
          value={authorEmail}
          onChange={(event) => setAuthorEmail(event.target.value)}
          required
        />
        <TextInput
          label="제목"
          name="title"
          placeholder="문의 제목을 입력해 주세요"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={50}
          required
        />
        <TextArea
          label="내용"
          name="content"
          placeholder="문의 내용을 입력해 주세요"
          value={content}
          onChange={(event) => setContent(event.target.value)}
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
          <Button
            type="submit"
            isLoading={pending}
            disabled={!title.trim() || !content.trim() || !authorName.trim() || !authorEmail.trim()}
          >
            등록
          </Button>
        </div>
      </form>
    </>
  );
}

export default InquiryCreatePage;
