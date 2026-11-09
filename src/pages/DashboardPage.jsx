import { useOutletContext } from 'react-router';
import { normalizeApiDate } from '../utils/normalizeApiDate';

const joinedAtFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formatJoinedAt(value) {
  const date = new Date(normalizeApiDate(value));

  if (Number.isNaN(date.getTime())) return '-';

  const parts = joinedAtFormatter.formatToParts(date);
  const getPart = (type) => parts.find((part) => part.type === type)?.value ?? '';

  return `${getPart('year')}.${getPart('month')}.${getPart('day')}`;
}

function DashboardPage() {
  const { user, inquiries } = useOutletContext();

  const myInquiryCount = inquiries.filter((inquiry) => inquiry.userId === user.id).length;

  const cards = [
    {
      id: 'user-info',
      title: '내 정보',
      items: [
        { label: '이름', value: user.name || '미등록' },
        { label: '이메일', value: user.email },
        { label: '가입일', value: formatJoinedAt(user.created_at) },
      ],
    },
    {
      id: 'inquiry-stats',
      title: '문의 현황',
      items: [
        { label: '전체 문의', value: `${inquiries.length}건` },
        { label: '내가 쓴 문의', value: `${myInquiryCount}건` },
      ],
    },
  ];

  return (
    <section aria-labelledby="dashboard-title" className="flex flex-col gap-[24px]">
      <h2 id="dashboard-title" className="text-[24px] leading-[32px] font-bold text-[#000000]">
        대시보드
      </h2>

      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        {cards.map((card) => (
          <section
            key={card.id}
            aria-labelledby={`${card.id}-title`}
            className="min-w-0 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] p-[24px]"
          >
            <h3
              id={`${card.id}-title`}
              className="mb-[12px] text-[18px] leading-[28px] font-bold text-[#000000]"
            >
              {card.title}
            </h3>

            <dl>
              {card.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-[16px] border-b border-[#F3F4F6] py-[14px] text-[14px] leading-[20px] last:border-b-0"
                >
                  <dt className="shrink-0 text-[#6A7282]">{item.label}</dt>

                  <dd className="min-w-0 text-right font-medium break-words text-[#000000]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
