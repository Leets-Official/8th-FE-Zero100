import { useEffect, useState } from 'react';

type Inquiry = {
id: number;
title: string;
category: string;
status: string;
date: string;
content?: string;
};

const initialInquiries: Inquiry[] = [
{
id: 1,
title: '서비스 이용 방법이 궁금해요',
category: '서비스 문의',
status: '답변 대기',
date: '2026.10.08',
},
{
id: 2,
title: '회원정보를 변경하고 싶어요',
category: '계정 문의',
status: '답변 완료',
date: '2026.10.07',
},
{
id: 3,
title: '로그인이 되지 않아요',
category: '오류 문의',
status: '답변 대기',
date: '2026.10.06',
},
];

export default function Dashboard() {
const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
try {
const saved = localStorage.getItem('inquiries');
return saved
? (JSON.parse(saved) as Inquiry[])
: initialInquiries;
} catch {
return initialInquiries;
}
});

useEffect(() => {
const updateInquiries = () => {
try {
const saved = localStorage.getItem('inquiries');
setInquiries(
saved ? (JSON.parse(saved) as Inquiry[]) : initialInquiries,
);
} catch {
setInquiries(initialInquiries);
}
};


window.addEventListener('storage', updateInquiries);
window.addEventListener('focus', updateInquiries);

return () => {
  window.removeEventListener('storage', updateInquiries);
  window.removeEventListener('focus', updateInquiries);
};


}, []);

const totalCount = inquiries.length;

return ( <div className="min-h-screen bg-gray-50 p-6 md:p-10"> <header className="mb-10"> <h1 className="text-2xl font-bold text-gray-900">
대시보드 홈 </h1> <p className="mt-2 text-sm text-gray-500">
안녕하세요! 내 정보와 문의 현황을 확인해 보세요. </p> </header>


  <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <article className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <h2 className="mb-6 text-lg font-bold text-gray-900">
        내 정보
      </h2>

      <dl className="space-y-5">
        <div className="flex flex-col gap-1 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
          <dt className="w-24 text-sm text-gray-500">이름</dt>
          <dd className="text-sm font-medium text-gray-900">
            홍길동
          </dd>
        </div>

        <div className="flex flex-col gap-1 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
          <dt className="w-24 text-sm text-gray-500">이메일</dt>
          <dd className="text-sm font-medium text-gray-900">
            example@email.com
          </dd>
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <dt className="w-24 text-sm text-gray-500">가입일</dt>
          <dd className="text-sm font-medium text-gray-900">
            2026.10.01
          </dd>
        </div>
      </dl>
    </article>

    <article className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <h2 className="mb-6 text-lg font-bold text-gray-900">
        문의 현황
      </h2>

      <dl className="space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <dt className="text-sm text-gray-500">전체 문의</dt>
          <dd className="text-2xl font-bold text-gray-900">
            {totalCount}
            <span className="ml-1 text-sm font-normal text-gray-500">
              건
            </span>
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-500">내가 쓴 문의</dt>
          <dd className="text-2xl font-bold text-gray-900">
            {totalCount}
            <span className="ml-1 text-sm font-normal text-gray-500">
              건
            </span>
          </dd>
        </div>
      </dl>
    </article>
  </section>
</div>

);
}
