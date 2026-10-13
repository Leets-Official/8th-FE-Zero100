import { useLocation } from 'react-router';
import { getPageLabel } from '../../constants/navigation';

export default function Header() {
  const { pathname } = useLocation();
  const today = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date());
  return (
    <header className="workspace-header">
      <p className="breadcrumb">
        <span>워크스페이스</span>
        <span aria-hidden="true">/</span>
        <strong>{getPageLabel(pathname)}</strong>
      </p>
      <p className="header-date">{today}</p>
    </header>
  );
}
