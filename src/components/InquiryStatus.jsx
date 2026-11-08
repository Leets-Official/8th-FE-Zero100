import useAuth from '../context/useAuth.js';

export default function InquiryStatus({ loading, error, status, reload }) {
  const { logout } = useAuth();
  if (loading) return <p role="status">문의를 불러오고 있습니다.</p>;
  if (!error) return null;
  return (
    <div>
      <p role="alert">{error}</p>
      <button type="button" onClick={status === 401 ? logout : reload}>
        {status === 401 ? '다시 로그인' : '다시 시도'}
      </button>
    </div>
  );
}
