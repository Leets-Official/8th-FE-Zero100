import { useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { getInquiry, updateInquiry } from '../../api/admin';
import { useAdminResource } from '../../hooks/useAdminResource';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { inquiryListLocation } from '../../utils/inquiryList';
import AsyncPanel from '../../components/common/AsyncPanel';
import InquiryForm from '../../components/inquiries/InquiryForm';

export default function InquiryEditPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useToast();
  const load = useCallback((options) => getInquiry(id, options), [id]);
  const resource = useAdminResource(load);
  const inquiry = resource.data;
  const detailPath = `/inquiries/${encodeURIComponent(id)}`;
  const navigationState = { listLocation: inquiryListLocation(location.state) };
  return (
    <div className="form-page">
      <h1 className="admin-page-title">문의 수정</h1>
      <AsyncPanel {...resource} onRetry={resource.reload}>
        {inquiry &&
          (inquiry.userId === user.id ? (
            <InquiryForm
              key={inquiry.id}
              initialValues={{
                name: inquiry.name,
                email: inquiry.email,
                title: inquiry.title,
                content: inquiry.content,
              }}
              submitLabel="저장"
              cancelTo={detailPath}
              navigationState={navigationState}
              onSave={async (values) => {
                await updateInquiry(id, values);
                notify('문의가 수정되었습니다.');
                navigate(detailPath, { replace: true, state: navigationState });
              }}
            />
          ) : (
            <div className="async-panel" role="alert">
              <p>직접 작성한 문의만 수정할 수 있습니다.</p>
              <Link
                className="admin-button admin-button--secondary"
                to={detailPath}
                state={navigationState}
              >
                상세로 돌아가기
              </Link>
            </div>
          ))}
      </AsyncPanel>
    </div>
  );
}
