import { twMerge } from 'tailwind-merge';

// Figma 화면 전반에서 반복되는 카드 스타일. 내부 여백은 화면마다 달라(24px, 32px 등) className으로 지정
const BASE_CLASS_NAME =
  'box-border border-[0.93px] border-solid border-[#e5e7eb] rounded-[10px] bg-[#ffffff]';

// Dashboard 전용 카드. as로 렌더링 태그(div, section, article 등)를 선택하고, 내부 콘텐츠는 children으로 전달
function Card({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component className={twMerge(BASE_CLASS_NAME, className)} {...props}>
      {children}
    </Component>
  );
}

export default Card;
