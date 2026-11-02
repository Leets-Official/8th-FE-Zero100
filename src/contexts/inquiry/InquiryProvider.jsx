import { useState } from 'react';
import { MOCK_INQUIRIES } from '../../constants/mockInquiries';
import { InquiryContext } from './InquiryContext';

/**
 * API 연동 전이라 문의 목록을 메모리에만 들고 있는다. 새로고침하면 예시 데이터로 돌아간다.
 * 나중에 API를 연결하면 이 Provider 안의 함수들만 요청 코드로 바꾸면 된다.
 */
function InquiryProvider({ children }) {
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);

  // 최신 문의가 목록 맨 위에 오도록 앞에 추가한다. 만든 문의를 돌려줘서 상세 페이지로 이동할 수 있게 한다.
  const addInquiry = ({ name, email, title, content }) => {
    const newInquiry = {
      id: Date.now(),
      name,
      email,
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    setInquiries((prevInquiries) => [newInquiry, ...prevInquiries]);
    return newInquiry;
  };

  const deleteInquiry = (id) => {
    setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => inquiry.id !== id));
  };

  return (
    <InquiryContext value={{ inquiries, addInquiry, deleteInquiry }}>{children}</InquiryContext>
  );
}

export default InquiryProvider;
