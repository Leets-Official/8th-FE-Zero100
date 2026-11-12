import { getInquiries } from '../../api/inquiryApi';
import ButtonLink from '../../components/dashboard/ButtonLink/ButtonLink';
import InquiryTable from '../../components/dashboard/InquiryTable/InquiryTable';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import RequestStatus from '../../components/dashboard/RequestStatus/RequestStatus';
import { ROUTES } from '../../constants/routes';
import { useAsyncData } from '../../hooks/useAsyncData';

function InquiryListPage() {
  const {
    status,
    data: inquiries,
    error,
    retry,
  } = useAsyncData(getInquiries, '문의 목록을 불러오지 못했어요.');

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="문의 목록"
        actions={<ButtonLink to={ROUTES.DASHBOARD_INQUIRY_NEW}>문의 등록</ButtonLink>}
      />
      {status === 'success' ? (
        <InquiryTable inquiries={inquiries} />
      ) : (
        <RequestStatus
          status={status}
          error={error}
          loadingMessage="문의 목록을 불러오고 있어요."
          onRetry={retry}
        />
      )}
    </div>
  );
}

export default InquiryListPage;
