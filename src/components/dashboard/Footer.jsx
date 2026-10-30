import { twMerge } from 'tailwind-merge';

// Figma 공통 컴포넌트 Footer
const BASE_CLASS_NAME =
  'box-border flex flex-row items-center justify-end h-[60px] pr-[24px] border-0 border-t-[0.93px] border-solid border-[#e5e7eb] bg-[#ffffff]';

// Dashboard 전용 푸터. 문구는 text로 전달하고, 그 외 내부 콘텐츠는 children으로 전달
function Footer({ text, className, children, ...props }) {
  return (
    <footer className={twMerge(BASE_CLASS_NAME, className)} {...props}>
      {text && (
        <p className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4a5565]">
          {text}
        </p>
      )}
      {children}
    </footer>
  );
}

export default Footer;
