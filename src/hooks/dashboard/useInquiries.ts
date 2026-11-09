import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../api/axiosInstance.ts';
import { fetchInquiries } from '../../api/inquiryApi.ts';
import type { Inquiry } from '../../types/inquiry.ts';

type InquiryListState =
  | { status: 'loading' }
  | { status: 'success'; inquiries: Inquiry[] }
  | { status: 'error'; errorMessage: string };

const EMPTY_INQUIRIES: Inquiry[] = [];

// 서버의 문의 목록을 조회한다.
// 목록·상세·대시보드가 각각 마운트될 때 조회하므로 등록·삭제 후 이동하면 항상 최신 데이터를 받는다.
export function useInquiries() {
  const [state, setState] = useState<InquiryListState>({ status: 'loading' });
  // 값을 바꾸면 목록을 다시 조회한다. (다시 시도)
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    // 언마운트되었거나 다시 조회를 시작했다면 이전 응답은 반영하지 않는다.
    let isIgnored = false;

    fetchInquiries()
      .then((inquiries) => {
        if (!isIgnored) setState({ status: 'success', inquiries });
      })
      .catch((error: unknown) => {
        if (!isIgnored) setState({ status: 'error', errorMessage: getErrorMessage(error) });
      });

    return () => {
      isIgnored = true;
    };
  }, [requestKey]);

  const reload = () => {
    setState({ status: 'loading' });
    setRequestKey((key) => key + 1);
  };

  return {
    inquiries: state.status === 'success' ? state.inquiries : EMPTY_INQUIRIES,
    isLoading: state.status === 'loading',
    errorMessage: state.status === 'error' ? state.errorMessage : '',
    reload,
  };
}
