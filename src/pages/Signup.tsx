export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          회원가입
        </h1>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해 주세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800"
          >
            회원가입
          </button>

          <p className="pt-2 text-center text-sm text-gray-500">
            이미 회원이신가요?{' '}
            <a
              href="/login"
              className="font-semibold text-gray-900 underline"
            >
              로그인
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}