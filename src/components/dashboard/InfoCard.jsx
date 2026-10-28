import { useId } from 'react';
import Card from './Card.jsx';

// Figma 대시보드 홈의 정보 카드(내 정보, 문의 현황)
function InfoCard({ title, items }) {
  const titleId = useId();

  return (
    <Card as="section" aria-labelledby={titleId} className="flex flex-col gap-[16px] p-[24px]">
      <h2
        id={titleId}
        className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[18px] leading-[28px] tracking-[0px] text-[#000000]"
      >
        {title}
      </h2>
      <dl className="flex flex-col gap-[12px] m-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-row justify-between py-[8px] border-0 border-b-[0.93px] border-solid border-[#f3f4f6] last:border-b-0"
          >
            <dt className="shrink-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4a5565]">
              {item.label}
            </dt>
            <dd className="min-w-0 m-0 font-[family-name:var(--font-family-base)] font-medium text-[14px] leading-[20px] tracking-[0px] text-right text-[#000000] wrap-anywhere">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export default InfoCard;
