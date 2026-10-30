import { useNavigate } from 'react-router';
import Button from '../../components/dashboard/Button.jsx';
import InquiryTable from '../../components/dashboard/InquiryTable.jsx';

function InquiryListPage({ inquiries }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-row items-start justify-between h-[40px]">
        <h1 className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#000000]">
          문의 목록
        </h1>
        <Button className="self-center" onClick={() => navigate('/dashboard/inquiries/new')}>
          문의 등록
        </Button>
      </div>
      <InquiryTable inquiries={inquiries} />
    </div>
  );
}

export default InquiryListPage;
