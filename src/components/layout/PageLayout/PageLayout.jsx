/** 모든 페이지가 같은 폭과 여백을 쓰도록 감싸는 틀 */
function PageLayout({ children }) {
  return (
    <main className="mx-auto flex w-full max-w-[552px] flex-col gap-6 px-4 py-15">{children}</main>
  );
}

export default PageLayout;
