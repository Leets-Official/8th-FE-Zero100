import { Link } from 'react-router';
import Text from '../../common/Text/Text';

/**
 * 페이지 제목과 다른 페이지로 가는 링크.
 * 링크 앞뒤의 화살표는 꾸밈용이라 스크린리더가 읽지 않게 숨긴다.
 */
function PageHeader({ title, linkTo, linkLabel, arrow = 'right' }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <Text as="h1" variant="title">
        {title}
      </Text>
      <Link
        to={linkTo}
        className="shrink-0 rounded-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {arrow === 'left' && <span aria-hidden="true">← </span>}
        {linkLabel}
        {arrow === 'right' && <span aria-hidden="true"> →</span>}
      </Link>
    </header>
  );
}

export default PageHeader;
