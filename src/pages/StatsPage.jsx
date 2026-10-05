import TodoHeader from '../components/TodoHeader/TodoHeader';

function StatsPage({ todos }) {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const stats = [
    { label: '전체', count: totalCount },
    { label: '진행 중', count: activeCount },
    { label: '완료', count: completedCount },
  ];

  return (
    <>
      <TodoHeader />

      <section aria-labelledby="stats-title">
        <h2 id="stats-title" className="text-[20px] font-bold text-[#222222]">
          할 일 통계
        </h2>

        <p className="mt-[8px] mb-[12px] text-[14px] text-[#777777]">
          할 일을 얼마나 완료했는지 한눈에 확인하세요.
        </p>

        <div className="rounded-[10px] border-[1.5px] border-[#dedbff] bg-[#f7f6ff] px-[24px] py-[26px]">
          <div className="flex items-center justify-between gap-[16px]">
            <div>
              <h3 className="text-[16px] font-bold text-[#222222]">완료율</h3>

              <p className="mt-[6px] text-[12px] text-[#777777]">
                전체 {totalCount}개 중 {completedCount}개를 완료했어요.
              </p>
            </div>

            <p className="shrink-0 text-[44px] font-extrabold text-[#4f46e5]">{completionRate}%</p>
          </div>

          <div
            role="progressbar"
            aria-label="할 일 완료율"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completionRate}
            className="mt-[22px] h-[9px] overflow-hidden rounded-full bg-[#e9e7ff]"
          >
            <div
              className="h-full rounded-full bg-[#4f46e5]"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <dl className="mt-[24px] grid grid-cols-3 gap-[12px]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[8px] border border-[#eeeeee] bg-[#ffffff] p-[18px]"
            >
              <dt className="text-[13px] text-[#666666]">{stat.label}</dt>

              <dd className="mt-[3.5px] flex items-baseline gap-[3.5px]">
                <strong className="text-[28px] font-bold text-[#111111]">{stat.count}</strong>
                <small className="text-[12px] text-[#777777]">개</small>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

export default StatsPage;
