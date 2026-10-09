import { Link } from 'react-router-dom';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            마이페이지
          </h1>
          <p className="mt-2 text-gray-500">
            내 계정 정보를 확인할 수 있어요.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl">
              👤
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                사용자님
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                user@example.com
              </p>
            </div>
          </div>

          <div className="space-y-5 py-6">
            <div>
              <p className="mb-2 text-sm text-gray-500">이름</p>
              <p className="font-medium text-gray-900">사용자</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">이메일</p>
              <p className="font-medium text-gray-900">
                user@example.com
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
              onClick={() => alert('프로필 수정 기능은 아직 구현되지 않았어요.')}
            >
              프로필 수정
            </button>

            <Link
              to="/"
              className="rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-gray-700 hover:bg-gray-50"
            >
              대시보드로 돌아가기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}