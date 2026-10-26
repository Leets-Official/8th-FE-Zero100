import { useTodos } from '../context/useTodos.js';

function StatsPage() {
  const { totalCount, remainingCount, completedCount, completionRate } = useTodos();
  const counts = [
    { label: '전체', count: totalCount },
    { label: '진행 중', count: remainingCount },
    { label: '완료', count: completedCount },
  ];

  return (
    <section aria-label="할 일 통계" className="flex flex-col text-[#222]">
      <h2 className="text-[20px] font-bold">할 일 통계</h2>
      <p className="mt-1 text-sm text-[#767676]">할 일을 얼마나 완료했는지 한눈에 확인하세요.</p>

      <div className="mt-4 rounded-[10px] border border-[#dedbff] bg-[#f7f6ff] p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#222]">완료율</h3>
            <p className="mt-1 text-sm text-[#767676]">
              전체 {totalCount}개 중 {completedCount}개를 완료했어요.
            </p>
          </div>
          <strong className="text-[44px] leading-none font-bold text-[#4f46e5]">
            {completionRate}%
          </strong>
        </div>
        <div
          role="progressbar"
          aria-label="할 일 완료율"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-6 h-2 overflow-hidden rounded-full bg-[#e7e5ff]"
        >
          <div
            className="h-full rounded-full bg-[#4f46e5] transition-[width]"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {counts.map(({ label, count }) => (
          <div key={label} className="rounded-[8px] border border-[#e5e5e5] p-4">
            <p className="text-sm text-[#767676]">{label}</p>
            <p className="mt-1 text-[30px] leading-none font-bold text-[#111]">
              {count}
              <span className="ml-1 text-sm font-normal text-[#767676]">개</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsPage;
