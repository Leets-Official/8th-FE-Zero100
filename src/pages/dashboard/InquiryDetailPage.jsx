import { useNavigate, useParams } from 'react-router';
import Button from '../../components/dashboard/Button.jsx';
import Card from '../../components/dashboard/Card.jsx';
import InquiryDetailCard from '../../components/dashboard/InquiryDetailCard.jsx';

function InquiryDetailPage({ inquiries }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const inquiry = inquiries.find((item) => String(item.id) === id);

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[896.3px] mx-auto">
      <div className="flex flex-row items-center justify-between h-[41.9px]">
        <h1 className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#000000]">
          문의 상세
        </h1>
        <div className="flex flex-row gap-[12px] self-start">
          <Button variant="secondary" onClick={() => navigate('/dashboard/inquiries')}>
            목록으로
          </Button>
          {inquiry && (
            <Button variant="secondary" disabled>
              삭제
            </Button>
          )}
        </div>
      </div>
      {inquiry ? (
        <InquiryDetailCard inquiry={inquiry} />
      ) : (
        <Card className="p-[32px]">
          <p className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4a5565]">
            문의를 찾을 수 없습니다.
          </p>
        </Card>
      )}
    </div>
  );
}

export default InquiryDetailPage;
