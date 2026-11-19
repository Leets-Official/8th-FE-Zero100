import './AuthLoading.css';

function AuthLoading({ message = '로그인 정보를 확인하는 중입니다.' }) {
  return (
    <div className="auth-loading" role="status">
      {message}
    </div>
  );
}

export default AuthLoading;
