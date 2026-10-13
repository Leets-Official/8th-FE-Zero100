export default function RequestStatus({ status }) {
  const labels = { loading: '불러오는 중', success: '조회 완료', error: '연결 오류' };
  return (
    <span className={`request-status request-status--${status}`} role="status">
      <span aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
