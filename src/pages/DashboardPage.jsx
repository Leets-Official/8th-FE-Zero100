//임시 데이터
const mockUser = {
  name: '홍길동',
  email: 'hong@example.com',
  joinedAt: '2024.01.15',
};

const mockInquiryStats = {
  total: 24,
  mine: 8,
};

const cards = [
  {
    id: 'user-info',
    title: '내 정보',
    items: [
      { label: '이름', value: mockUser.name },
      { label: '이메일', value: mockUser.email },
      { label: '가입일', value: mockUser.joinedAt },
    ],
  },
  {
    id: 'inquiry-stats',
    title: '문의 현황',
    items: [
      { label: '전체 문의', value: `${mockInquiryStats.total}건` },
      { label: '내가 쓴 문의', value: `${mockInquiryStats.mine}건` },
    ],
  },
];

function DashboardPage() {
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
            className="min-w-0 rounded-[10px] bg-[#ffffff] p-[24px] shadow-[inset_0_0_0_0.93px_#e5e7eb]"
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
                  className="flex items-start justify-between gap-[16px] border-b border-[#f3f4f6] py-[14px] text-[14px] leading-[20px] last:border-b-0"
                >
                  <dt className="shrink-0 text-[#6a7282]">{item.label}</dt>

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
