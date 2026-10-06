import { twMerge } from 'tailwind-merge';

const TAB_BASE_CLASS_NAME =
  'box-border flex items-center justify-center h-[32.5px] m-0 p-0 border-0 border-b-2 border-solid border-transparent bg-transparent font-[family-name:var(--font-family-base)] font-semibold text-[14.08px] leading-[21.12px] tracking-[0px] text-[#888888] whitespace-nowrap cursor-pointer';

// 탭 상태는 상위 페이지에서 관리하고, TabNav는 탭 렌더링과 클릭 처리만 담당
function TabNav({ tabs, activeTab, onChangeTab }) {
  return (
    <nav
      className={twMerge(
        'flex flex-row items-start gap-[24px] w-[520px] h-[32.5px] border-0 border-b-[1.5px] border-solid border-[#e5e5e5]',
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={twMerge(
              TAB_BASE_CLASS_NAME,
              tab.className,
              isSelected && 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]',
            )}
            onClick={() => onChangeTab(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

export default TabNav;
