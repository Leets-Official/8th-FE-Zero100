/** 대시보드 페이지 제목. 오른쪽에 버튼(예: 문의 등록, 목록으로)이 필요하면 actions로 받는다. */
function PageHeading({ title, actions }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl leading-8 font-bold text-dash-black">{title}</h1>
      {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
    </div>
  );
}

export default PageHeading;
