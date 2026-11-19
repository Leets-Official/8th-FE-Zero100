import { useEffect, useState } from 'react';

import { getErrorMessage } from '../api/getErrorMessage';
import { getInquiries } from '../api/inquiryApi';

function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getInquiries()
      .then((data) => {
        if (!ignore) setInquiries(data);
      })
      .catch((requestError) => {
        if (!ignore) setError(getErrorMessage(requestError, '문의 목록을 불러오지 못했습니다.'));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { inquiries, isLoading, error };
}

export default useInquiries;
