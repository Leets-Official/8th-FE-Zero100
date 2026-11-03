import { Link } from 'react-router';
import { getButtonClassName } from '../Button/buttonStyles';

/**
 * 버튼처럼 보이지만 다른 페이지로 이동만 하는 링크 (예: 문의 등록, 목록으로).
 * a 태그라서 Ctrl+클릭으로 새 탭 열기, 주소 복사 같은 브라우저 기능을 그대로 쓸 수 있다.
 */
function ButtonLink({
  children,
  to,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...rest
}) {
  return (
    <Link to={to} className={getButtonClassName({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

export default ButtonLink;
