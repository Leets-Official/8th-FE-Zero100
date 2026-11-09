import { useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/getErrorMessage';

/**
 * 페이지에 들어왔을 때 서버 데이터를 불러오고, 불러오는 중 / 성공 / 실패 상태를 함께 돌려준다.
 * load는 컴포넌트 밖에 만든 함수(매 렌더링마다 새로 만들어지지 않는 함수)를 넘겨야 한다.
 */
export const useAsyncData = (load, errorMessage) => {
  // status: loading(불러오는 중) / success / error
  const [result, setResult] = useState({ status: 'loading', data: null, error: '' });
  // 다시 시도 버튼을 누르면 숫자를 바꿔서 아래 effect가 다시 실행되게 한다.
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // 응답이 오기 전에 페이지를 떠나면 늦게 온 응답으로 state를 바꾸지 않는다.
    let isIgnored = false;

    load()
      .then((data) => {
        if (!isIgnored) setResult({ status: 'success', data, error: '' });
      })
      .catch((error) => {
        if (!isIgnored) {
          setResult({ status: 'error', data: null, error: getErrorMessage(error, errorMessage) });
        }
      });

    return () => {
      isIgnored = true;
    };
  }, [load, errorMessage, requestCount]);

  const retry = () => {
    setResult({ status: 'loading', data: null, error: '' });
    setRequestCount((prevCount) => prevCount + 1);
  };

  return { ...result, retry };
};
