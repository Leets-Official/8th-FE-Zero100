function TodoStats(props) {
  const total = props.tasks.length;
  const completed = props.tasks.filter((task) => task.done === true).length;
  const inProgress = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const counts = [
    { label: '전체', value: total },
    { label: '진행 중', value: inProgress },
    { label: '완료', value: completed },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[21.6px] leading-[1.5] font-bold text-[#222]">할 일 통계</h2>
        <p className="text-[14.4px] leading-[1.5] text-[#777]">
          할 일을 얼마나 완료했는지 한눈에 확인하세요.
        </p>
      </div>

      <section className="flex-col mt-2 flex gap-[22px] rounded-[10px] border-[1.5px] border-[#dedbff] bg-[#f7f6ff] px-6 py-[26px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base leading-[1.5] font-bold text-[#222]">완료율</h3>
            <p className="text-[13.6px] leading-[1.5] text-[#777]">
              전체 {total}개 중 {completed}개를 완료했어요.
            </p>
          </div>
          <p className="text-[44px] leading-none font-bold text-indigo-600">{rate}%</p>
        </div>

        <div
          role="progressbar"
          aria-valuenow={rate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="완료율"
          className="h-[9px] overflow-hidden rounded-full bg-[#e9e7ff]"
        >
          <div className="h-full rounded-full bg-indigo-600" style={{ width: `${rate}%` }} />
        </div>
      </section>

      <div className="mt-9 grid grid-cols-3 gap-2.5">
        {counts.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-3 rounded-lg border-[1.5px] border-[#eee] bg-white p-[18px]"
          >
            <p className="text-[13.44px] leading-[1.5] text-[#666]">{item.label}</p>
            <p className="flex items-baseline gap-1 py-0.5">
              <span className="text-[28px] leading-none font-bold text-[#111]">{item.value}</span>
              <span className="text-[12.8px] leading-[1.5] text-[#777]">개</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoStats;
