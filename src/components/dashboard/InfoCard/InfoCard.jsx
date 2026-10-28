import { useId } from 'react';

/**
 * 제목 아래에 "이름: 값" 줄을 나열하는 카드 (예: 내 정보, 문의 현황).
 * 이름과 값 쌍이라 dl/dt/dd로 묶어서 스크린리더가 짝을 알 수 있게 한다.
 */
function InfoCard({ title, items }) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded-[10px] border border-dash-line bg-white p-6"
    >
      <h2 id={titleId} className="text-lg leading-7 font-bold text-dash-black">
        {title}
      </h2>
      <dl className="flex flex-col divide-y divide-dash-line">
        {items.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3.5">
            <dt className="shrink-0 text-sm leading-5 text-dash-text-sub">{label}</dt>
            <dd className="min-w-0 text-right text-sm leading-5 font-medium break-all text-dash-black">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default InfoCard;
