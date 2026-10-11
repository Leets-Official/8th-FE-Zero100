const TABS = [
  { id: 'list', label: '할 일 목록' },
  { id: 'stats', label: '통계' },
];

function TabMenu(props) {
  return (
    <div role="tablist" className="flex gap-6 border-b-[1.5px] border-[#e5e5e5]">
      {TABS.map((tab) => {
        const isActive = props.current === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => props.onChange(tab.id)}
            className={`-mb-[1.5px] cursor-pointer border-b-2 pb-[9.4px] text-[14.08px] leading-[1.5] font-semibold ${
              isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-[#888]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabMenu;
