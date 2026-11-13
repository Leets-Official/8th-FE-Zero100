import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';
import Card from '../../../components/common/Card.tsx';

// Figma 로그인·회원가입 화면에서 공통으로 쓰는 인증 카드 레이아웃
interface AuthCardProps {
  title: string;
  // 카드 하단 안내 문구와 이동 링크. linkTo가 없으면 표시하지 않는다.
  linkGuideText?: string;
  linkLabel?: string;
  linkTo?: string;
  className?: string;
  children: ReactNode;
}

function AuthCard({ title, linkGuideText, linkLabel, linkTo, className, children }: AuthCardProps) {
  const titleId = useId();

  return (
    <main className="box-border flex flex-row items-center justify-center w-full min-h-screen p-[16px] bg-[#f9fafb]">
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
        {linkTo && (
          <p className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-center text-[#4a5565]">
            {linkGuideText}{' '}
            <Link to={linkTo} className="text-[#000000] underline">
              {linkLabel}
            </Link>
          </p>
        )}
      </Card>
    </main>
  );
}

export default AuthCard;
