import { startTransition, useEffect, useState } from 'react';
// 실제 API 연동 전까지 Mock을 사용. 연동 시 '../../api/inquiryApi.ts'로 교체
import * as inquiryApi from '../../mocks/dashboard/inquiryMockApi.ts';
import type { MockInquiry, NewMockInquiry } from '../../types/inquiry.ts';

// 문의 상태 관리
export function useInquiries() {
  const [inquiries, setInquiries] = useState<MockInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isIgnored = false;

    inquiryApi.fetchInquiries().then((fetchedInquiries) => {
      if (isIgnored) return;
      setInquiries(fetchedInquiries);
      setIsLoading(false);
    });

    return () => {
      isIgnored = true;
    };
  }, []);

  // URL 파라미터(문자열)와 숫자 id를 함께 비교할 수 있도록 문자열로 맞춘다.
  const getInquiryById = (id: string | undefined) =>
    inquiries.find((inquiry) => String(inquiry.id) === String(id));

  const addInquiry = async (inquiry: NewMockInquiry) => {
    const createdInquiry = await inquiryApi.createInquiry(inquiry);
    setInquiries((current) => [...current, createdInquiry]);
  };

  const deleteInquiry = async (id: number, onDeleted?: () => void) => {
    await inquiryApi.deleteInquiry(id);
    startTransition(() => {
      setInquiries((current) => current.filter((inquiry) => inquiry.id !== id));
      onDeleted?.();
    });
  };

  return { inquiries, isLoading, getInquiryById, addInquiry, deleteInquiry };
}
