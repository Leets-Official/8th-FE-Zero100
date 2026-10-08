function CompletionRateCard({ totalCount, completedCount, completionRate }) {
  return (
    <div className="flex flex-col gap-5 rounded-[10px] border-2 border-primary-line bg-primary-soft px-6 py-[26px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-ink-sub">완료율</span>
          <span className="text-sm text-ink-muted">
            전체 {totalCount}개 중 {completedCount}개를 완료했어요.
          </span>
        </div>
        <span className="text-[44px] leading-none font-extrabold tracking-tighter text-primary">
          {completionRate}%
        </span>
      </div>

      {/* 진행 막대: 너비가 완료율에 따라 계속 바뀌므로 이 부분만 inline style로 지정한다. */}
      <div
        role="progressbar"
        aria-label="완료율"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={completionRate}
        className="h-2.5 overflow-hidden rounded-full bg-primary-track"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  );
}

export default CompletionRateCard;
