/**
 * 로그인/회원가입 화면의 공통 틀: 회색 배경 가운데에 제목이 있는 흰 카드.
 * 카드 아래쪽 안내 문구(예: 계정이 없으신가요? 회원가입)는 footer로 받는다.
 */
function AuthCard({ title, children, footer }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-dash-bg px-4 py-10">
      <section className="flex w-full max-w-md flex-col gap-6 rounded-[10px] border border-dash-line bg-white px-6 py-8 sm:px-8">
        <h1 className="text-center text-2xl leading-8 font-bold text-dash-black">{title}</h1>
        {children}
        {footer && <p className="text-center text-sm leading-5 text-dash-text-sub">{footer}</p>}
      </section>
    </main>
  );
}

export default AuthCard;
