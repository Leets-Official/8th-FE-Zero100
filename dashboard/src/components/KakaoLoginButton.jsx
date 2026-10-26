const KakaoLoginButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] text-base font-semibold text-[#381E1F]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.66 6.75l-.95 3.48c-.08.3.26.54.52.37l4.13-2.74c.54.06 1.09.1 1.64.1 5.52 0 10-3.58 10-8S17.52 3 12 3z"
        />
      </svg>
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
