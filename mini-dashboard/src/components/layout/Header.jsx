import { Link } from 'react-router';
import Button from '../common/Button.jsx';

function Header({ onLogout }) {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-line bg-white px-5 sm:px-8">
      <Link
        to="/"
        aria-label="ZERO100 Admin 대시보드"
        className="whitespace-nowrap text-xl font-extrabold tracking-tight"
      >
        ZERO100 <span className="font-semibold">Admin</span>
      </Link>
      <Button variant="ghost" size="sm" onClick={onLogout} disabled={!onLogout}>
        로그아웃
      </Button>
    </header>
  );
}

export default Header;
