import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../api/client';

type Me = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

type Inquiry = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  title: string;
  content: string;
  created_at: string;
};

function Dashboard() {
  const [me, setMe] = useState<Me | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 내 정보와 문의 목록을 동시에 조회
  useEffect(() => {
    Promise.all([api.get('/api/auth/me'), api.get('/api/inquiries')])
      .then(([meRes, inquiryRes]) => {
        setMe(meRes.data.data);
        setInquiries(inquiryRes.data.data);
      })
      .catch((error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.error
          : undefined;
        alert(message ?? '대시보드 정보를 불러오지 못했습니다.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  // 내가 쓴 문의: 작성자 id(user_id)가 내 id와 같은 것
  const totalInquiryCount = inquiries.length;
  const myInquiryCount = me
    ? inquiries.filter((inquiry) => inquiry.user_id === me.id).length
    : 0;

  const displayValue = (value?: string) => {
    if (isLoading) return '불러오는 중...';
    return value ?? '-';
  };

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">대시보드</h1>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">내 정보</h2>

          <div className="divide-y divide-gray-100">
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">이름</span>
              <span className="font-medium">{displayValue(me?.name)}</span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">이메일</span>
              <span className="font-medium">{displayValue(me?.email)}</span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">가입일</span>
              <span className="font-medium">{displayValue(me?.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">문의 현황</h2>

          <div className="divide-y divide-gray-100">
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">전체 문의</span>
              <span className="font-medium">
                {isLoading ? '-' : `${totalInquiryCount}건`}
              </span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">내가 쓴 문의</span>
              <span className="font-medium">
                {isLoading ? '-' : `${myInquiryCount}건`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
