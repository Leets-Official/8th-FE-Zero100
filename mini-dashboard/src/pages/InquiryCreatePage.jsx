import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDashboard } from '../hooks/useDashboard.js';
import Button from '../components/common/Button.jsx';
import LinkButton from '../components/common/LinkButton.jsx';
import TextInput from '../components/common/TextInput.jsx';
import TextArea from '../components/common/TextArea.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

function InquiryCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addInquiry } = useDashboard();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addInquiry({ title, content });
    navigate('/inquiries');
  }

  return (
    <>
      <PageHeading title="문의 등록" />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-6 rounded-lg border border-line bg-white p-6 sm:p-8"
      >
        <TextInput
          label="제목"
          name="title"
          placeholder="문의 제목을 입력해 주세요"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
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
        <div className="flex justify-end gap-3">
          <LinkButton to="/inquiries" variant="secondary">
            취소
          </LinkButton>
          <Button type="submit" disabled={!title.trim() || !content.trim()}>
            등록
          </Button>
        </div>
      </form>
    </>
  );
}

export default InquiryCreatePage;
