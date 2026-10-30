import { twMerge } from 'tailwind-merge';
import Card from './Card.jsx';

const LABEL_CLASS_NAME =
  'm-0 font-[family-name:var(--font-family-base)] font-normal text-[12px] leading-[16px] tracking-[0px] text-[#6a7282]';

function InquiryInfoField({ label, value, labelClassName }) {
  return (
    <div className="flex flex-col gap-[6px] min-w-0">
      <p className={twMerge(LABEL_CLASS_NAME, labelClassName)}>{label}</p>
      <p className="m-0 font-[family-name:var(--font-family-base)] font-medium text-[14px] leading-[20px] tracking-[0px] text-[#000000] wrap-anywhere">
        {value}
      </p>
    </div>
  );
}

// Figma 문의 내용 화면의 상세 카드
function InquiryDetailCard({ inquiry }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-[12px] px-[32px] pt-[24px] pb-[24px] border-0 border-b-[0.93px] border-solid border-[#e5e7eb]">
        <p className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#6a7282]">
          {inquiry.createdAt}
        </p>
        <h2 className="mt-[-3.9px] mx-0 mb-[3.9px] font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#000000] wrap-anywhere">
          {inquiry.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-[32px] px-[32px] pt-[20px] pb-[19.07px] border-0 border-b-[0.93px] border-solid border-[#e5e7eb] bg-[#f9fafb] md:grid-cols-2">
        <InquiryInfoField label="작성자" value={inquiry.name} />
        <InquiryInfoField
          label="이메일"
          value={inquiry.email}
          labelClassName="mt-[-1.9px] mb-[1.9px]"
        />
      </div>
      <div className="flex flex-col gap-[16px] px-[32px] pt-[25.4px] pb-[23.2px]">
        <h3 className="mt-[-1.9px] mx-0 mb-[1.9px] font-[family-name:var(--font-family-base)] font-bold text-[12px] leading-[16px] tracking-[0px] text-[#6a7282]">
          문의 내용
        </h3>
        <p className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[22.75px] tracking-[0px] text-[#1e2939] whitespace-pre-wrap wrap-anywhere">
          {inquiry.content}
        </p>
      </div>
    </Card>
  );
}

export default InquiryDetailCard;
