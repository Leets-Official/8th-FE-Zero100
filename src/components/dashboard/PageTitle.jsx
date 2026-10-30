const BASE_CLASS_NAME =
  'm-0 font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#000000]';

// Dashboard 페이지 제목. 화면별 여백은 className으로 지정
function PageTitle({ className, children }) {
  return <h1 className={`${BASE_CLASS_NAME} ${className ?? ''}`}>{children}</h1>;
}

export default PageTitle;
