// Dashboard 전용 카드. as로 렌더링 태그(div, section, article 등)를 선택하고, 내부 콘텐츠는 children으로 전달
function Card({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

export default Card;
