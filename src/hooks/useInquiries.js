import { useContext } from 'react';
import { InquiryContext } from '../contexts/inquiry/InquiryContext';

export const useInquiries = () => {
  const context = useContext(InquiryContext);
  if (!context) throw new Error('useInquiries는 InquiryProvider 안에서 사용해야 합니다.');
  return context;
};
