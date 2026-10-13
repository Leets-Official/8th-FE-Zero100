import { Link, useSearchParams } from 'react-router';
import { getInquiries } from '../../api/admin';
import { useAdminResource } from '../../hooks/useAdminResource';
import { useAuth } from '../../hooks/useAuth';
import AsyncPanel from '../../components/common/AsyncPanel';
import InquiryTable from '../../components/inquiries/InquiryTable';

export default function InquiryListPage() {
  const resource = useAdminResource(getInquiries);
  const { user } = useAuth();
  const [params] = useSearchParams();
  const mine = params.get('mine') === 'true';
  const inquiries = (resource.data || []).filter((inquiry) => !mine || inquiry.userId === user.id);
  return (
    <>
      <div className="page-toolbar">
        <h1 className="admin-page-title">{mine ? '내가 쓴 문의' : '문의 목록'}</h1>
        <Link className="admin-button admin-button--primary" to="/inquiries/new">
          문의 등록
        </Link>
      </div>
      {mine && (
        <Link className="back-to-all" to="/inquiries">
          전체 문의 보기
        </Link>
      )}
      <AsyncPanel {...resource} onRetry={resource.reload}>
        <InquiryTable inquiries={inquiries} />
      </AsyncPanel>
    </>
  );
}
