function StatCard({ label, value }) {
  return (
    <div className="box-border flex flex-col justify-center gap-[4px] flex-[1_1_0] min-w-0 h-[102.1563px] p-[18px] border-[1.5px] border-solid border-[#eeeeee] rounded-[8px] bg-[#ffffff]">
      <span className="h-[21px] font-[family-name:var(--font-family-base)] font-semibold text-[13.44px] leading-[20.16px] tracking-[0px] text-[#666666]">
        {label}
      </span>
      <div className="box-border flex flex-row items-baseline gap-[4px] h-[31px] py-[2px] mb-[6px]">
        <span className="font-[family-name:var(--font-family-base)] font-bold text-[28px] leading-[28px] tracking-[0px] text-[#111111]">
          {value}
        </span>
        <span className="font-[family-name:var(--font-family-base)] font-normal text-[12.8px] leading-[19.2px] tracking-[0px] text-[#777777]">
          개
        </span>
      </div>
    </div>
  );
}

export default StatCard;
