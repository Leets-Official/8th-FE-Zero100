import { useNavigate } from 'react-router-dom';

export default function Header() {
const navigate = useNavigate();

const handleLogout = () => {
const confirmed = window.confirm('로그아웃하시겠어요?');


if (confirmed) {
  navigate('/login');
}


};

return ( <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 md:px-8"> <h1 className="text-lg font-bold tracking-tight text-gray-900">
ZERO100 Admin </h1>


  <button
    type="button"
    onClick={handleLogout}
    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
  >
    로그아웃
  </button>
</header>


);
}
