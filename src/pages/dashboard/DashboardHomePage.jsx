import { useEffect, useState } from 'react';
import { getMe } from '../../api/authApi';
import { getInquiries } from '../../api/inquiryApi';
import Button from '../../components/dashboard/Button/Button';
import InfoCard from '../../components/dashboard/InfoCard/InfoCard';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import { formatJoinDate } from '../../utils/formatJoinDate';
import { getErrorMessage } from '../../utils/getErrorMessage';

/** 대시보드 홈: 내 정보와 문의 현황을 카드 두 개로 보여준다. 화면이 좁으면 위아래로 쌓인다. */
function DashboardHomePage() {
  // status: loading(불러오는 중) / success / error
  const [result, setResult] = useState({ status: 'loading', me: null, inquiries: [], error: '' });
  // 다시 시도 버튼을 누르면 숫자를 바꿔서 아래 effect가 다시 실행되게 한다.
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // 응답이 오기 전에 페이지를 떠나면 늦게 온 응답으로 state를 바꾸지 않는다.
    let isIgnored = false;

    Promise.all([getMe(), getInquiries()])
      .then(([me, inquiries]) => {
        if (!isIgnored) setResult({ status: 'success', me, inquiries, error: '' });
      })
      .catch((error) => {
        if (!isIgnored) {
          setResult({
            status: 'error',
            me: null,
            inquiries: [],
            error: getErrorMessage(error, '대시보드 정보를 불러오지 못했어요.'),
          });
        }
      });

    return () => {
      isIgnored = true;
    };
  }, [requestCount]);

  const retry = () => {
    setResult((prevResult) => ({ ...prevResult, status: 'loading' }));
    setRequestCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeading title="대시보드" />
      <DashboardContent result={result} onRetry={retry} />
    </div>
  );
}

function DashboardContent({ result, onRetry }) {
  if (result.status === 'loading') {
    return (
      <p role="status" className="py-12 text-center text-sm text-dash-muted">
        대시보드 정보를 불러오고 있어요.
      </p>
    );
  }

  if (result.status === 'error') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[10px] border border-dash-line bg-white py-12">
        <p role="alert" className="text-sm text-dash-error">
          {result.error}
        </p>
        <Button variant="secondary" size="small" onClick={onRetry}>
          다시 시도
        </Button>
      </div>
    );
  }

  const { me, inquiries } = result;
  const myInquiryCount = inquiries.filter((inquiry) => inquiry.user_id === me.id).length;

  const myInfo = [
    { label: '이름', value: me.name || '-' },
    { label: '이메일', value: me.email },
    { label: '가입일', value: formatJoinDate(me.created_at) },
  ];
  const inquirySummary = [
    { label: '전체 문의', value: `${inquiries.length}건` },
    { label: '내가 쓴 문의', value: `${myInquiryCount}건` },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="내 정보" items={myInfo} />
      <InfoCard title="문의 현황" items={inquirySummary} />
    </div>
  );
}

export default DashboardHomePage;
