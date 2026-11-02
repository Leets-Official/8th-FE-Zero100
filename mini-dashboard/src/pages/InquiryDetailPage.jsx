import { useParams } from 'react-router';
import { useDashboard } from '../hooks/useDashboard.js';
import LinkButton from '../components/common/LinkButton.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function InquiryDetailPage() {
  const { inquiryId } = useParams();
  const { data } = useDashboard();
  const inquiry = data.inquiries.find((item) => item.id === inquiryId);

  return (
    <>
      <PageHeading
        title="문의 상세"
        action={
          <LinkButton to="/inquiries" variant="secondary">
            목록으로
          </LinkButton>
        }
      />
      {inquiry ? (
        <article className="max-w-3xl rounded-lg border border-line bg-white p-6 sm:p-8">
          <header className="border-b border-line pb-5">
            <p className="mb-3 text-sm text-muted">
              작성일{' '}
              <time dateTime={inquiry.createdAt}>
                {dateFormatter.format(new Date(inquiry.createdAt))}
              </time>
            </p>
            <h2 className="text-lg font-semibold break-words">{inquiry.title}</h2>
          </header>
          <dl className="grid gap-4 border-b border-line py-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="mb-2 text-muted">작성자</dt>
              <dd>
                {inquiry.authorName ||
                  (inquiry.authorId === data.profile.id ? data.profile.name : '정보 없음')}
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-muted">이메일</dt>
              <dd>
                {inquiry.authorEmail ||
                  (inquiry.authorId === data.profile.id ? data.profile.email : '정보 없음')}
              </dd>
            </div>
          </dl>
          <h3 className="pt-6 text-sm text-muted">문의 내용</h3>
          <p className="min-h-40 py-6 text-sm leading-7 break-words whitespace-pre-wrap">
            {inquiry.content}
          </p>
        </article>
      ) : (
        <p
          role="status"
          className="max-w-3xl rounded-lg border border-line bg-white p-8 text-sm text-muted"
        >
          문의를 찾을 수 없습니다.
        </p>
      )}
    </>
  );
}

export default InquiryDetailPage;
