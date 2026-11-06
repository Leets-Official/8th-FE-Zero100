import { startTransition, useEffect, useState } from 'react';
// 실제 API 연동 전까지 Mock을 사용. 연동 시 '../../api/inquiryApi.js'로 교체
import * as inquiryApi from '../../mocks/dashboard/inquiryMockApi.js';

// 문의 상태 관리
export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
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

  const getInquiryById = (id) => inquiries.find((inquiry) => String(inquiry.id) === String(id));

  const addInquiry = async (inquiry) => {
    const createdInquiry = await inquiryApi.createInquiry(inquiry);
    setInquiries((current) => [...current, createdInquiry]);
  };

  const deleteInquiry = async (id, onDeleted) => {
    await inquiryApi.deleteInquiry(id);
    startTransition(() => {
      setInquiries((current) => current.filter((inquiry) => inquiry.id !== id));
      onDeleted?.();
    });
  };

  return { inquiries, isLoading, getInquiryById, addInquiry, deleteInquiry };
}
