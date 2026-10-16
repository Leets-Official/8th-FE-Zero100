import './KakaoLoginButton.css';

const KakaoLoginButton = ({ onClick, children = '카카오 로그인', ...props }) => {
  return (
    <button type="button" className="kakao-login-button" onClick={onClick} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.252 0C4.142 0 0 3.274 0 7.314C0 9.944 1.755 12.249 4.39 13.538C4.196 14.26 3.689 16.155 3.587 16.56C3.462 17.063 3.771 17.057 3.974 16.922C4.134 16.816 6.51 15.2 7.534 14.502C8.091 14.585 8.666 14.629 9.252 14.629C14.362 14.629 18.505 11.354 18.505 7.314C18.505 3.274 14.362 0 9.252 0Z"
          fill="currentColor"
        />
      </svg>
      {children}
    </button>
  );
};

export default KakaoLoginButton;
