// Dashboard 전용 카드. 제목, 버튼, 정보 등 내부 콘텐츠는 children으로 전달
function Card({ className, children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default Card;
