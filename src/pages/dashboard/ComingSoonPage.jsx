/** 문의, 마이페이지처럼 메뉴만 먼저 만들어 둔 화면 (다음 주차에 API와 함께 구현 예정) */
function ComingSoonPage({ title }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-[28px] font-bold text-dash-black">{title}</h1>
      <p className="text-sm text-dash-muted">준비 중인 화면이에요.</p>
    </div>
  );
}

export default ComingSoonPage;
