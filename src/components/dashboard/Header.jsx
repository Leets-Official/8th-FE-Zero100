import { twMerge } from 'tailwind-merge';

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

// Figma 공통 컴포넌트 Header
const BASE_CLASS_NAME =
  'box-border flex flex-row items-center justify-between h-[60px] px-[24px] border-0 border-b-[0.93px] border-solid border-[#e5e7eb] bg-[#ffffff]';

// Dashboard 전용 헤더. 제목 태그는 titleAs(h1~h6)로 선택하고, 로고, 사용자 정보 등은 children으로 전달
// onLogout을 전달하면 Figma 디자인의 로그아웃 버튼을 표시
function Header({ title, titleAs = 'h1', onLogout, className, children, ...props }) {
  const TitleTag = HEADING_TAGS.includes(titleAs) ? titleAs : 'h1';

  return (
    <header className={twMerge(BASE_CLASS_NAME, className)} {...props}>
      {title && (
        <TitleTag className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[20px] leading-[28px] tracking-[0px] text-[#000000]">
          {title}
        </TitleTag>
      )}
      {children}
      {onLogout && (
        <button
          type="button"
          className="m-0 p-0 border-0 bg-transparent font-[family-name:var(--font-family-base)] font-medium text-[14px] leading-[20px] tracking-[0px] text-[#4a5565]"
          onClick={onLogout}
        >
          로그아웃
        </button>
      )}
    </header>
  );
}

export default Header;
