function StatCard({ label, value }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-lg border-[1.5px] border-[#eeeeee] bg-white p-[18px]">
      <dt className="text-sm font-semibold text-[#666666]">{label}</dt>
      <dd className="flex items-baseline gap-1">
        <span className="text-[28px] leading-none font-bold text-ink">{value}</span>
        <span className="text-[13px] text-ink-muted">개</span>
      </dd>
    </div>
  );
}

export default StatCard;
