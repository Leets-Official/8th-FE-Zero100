import { useId } from 'react';
import Card from './Card.jsx';

// Figma 로그인·회원가입 화면에서 공통으로 쓰는 인증 카드. 카드 너비·여백과 제목 스타일은 고정하고,
// 내부 요소 간 간격은 화면마다 달라(로그인 26px, 회원가입 28px) className으로 지정
function AuthCard({ title, className, children }) {
  const titleId = useId();

  return (
    <Card
      as="section"
      aria-labelledby={titleId}
      className={`flex flex-col w-full max-w-[448px] p-[32px] ${className ?? ''}`}
    >
      <h1
        id={titleId}
        className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-center text-[#000000]"
      >
        {title}
      </h1>
      {children}
    </Card>
  );
}

export default AuthCard;
