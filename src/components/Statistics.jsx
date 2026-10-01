import { twMerge } from 'tailwind-merge';
import StatCard from './StatCard.jsx';

// 통계값은 별도 state 없이 todos에서 매번 계산
function Statistics({ todos }) {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const inProgressCount = totalCount - completedCount;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <section className={twMerge('flex flex-col gap-[8px] w-[520px] -mt-[8px]')}>
      <div className={twMerge('flex flex-col w-[520px] h-[61px]')}>
        <h2
          className={twMerge(
            'h-[33px] m-0 font-[family-name:var(--font-family-base)] font-bold text-[21.6px] leading-[32.4px] tracking-[0px] text-[#222222]',
          )}
        >
          할 일 통계
        </h2>
        <p
          className={twMerge(
            'h-[22px] m-0 pt-[6px] font-[family-name:var(--font-family-base)] font-normal text-[14.4px] leading-[21.6px] tracking-[0px] text-[#777777]',
          )}
        >
          할 일을 얼마나 완료했는지 한눈에 확인하세요.
        </p>
      </div>
      <div
        className={twMerge(
          'box-border flex flex-col justify-between w-[520px] h-[137px] pt-[26px] pr-[24px] pb-[26px] pl-[24px] border-[2px] border-solid border-[#dedbff] rounded-[10px] bg-[#f7f6ff]',
        )}
      >
        <div className={twMerge('flex flex-row justify-between items-center h-[51px]')}>
          <div className={twMerge('flex flex-col')}>
            <span
              className={twMerge(
                'h-[24px] font-[family-name:var(--font-family-base)] font-bold text-[16px] leading-[24px] tracking-[0px] text-[#222222]',
              )}
            >
              완료율
            </span>
            <span
              className={twMerge(
                'h-[21px] pt-[6px] font-[family-name:var(--font-family-base)] font-normal text-[13.6px] leading-[20.4px] tracking-[0px] text-[#777777]',
              )}
            >
              전체 {totalCount}개 중 {completedCount}개를 완료했어요.
            </span>
          </div>
          <span
            className={twMerge(
              'flex-none font-[family-name:var(--font-family-base)] font-extrabold text-[44px] leading-[44px] tracking-[-1.5px] text-[color:var(--color-primary)]',
            )}
          >
            {completionRate}%
          </span>
        </div>
        <div className={twMerge('h-[9px] rounded-[999px] bg-[#e9e7ff] overflow-hidden')}>
          {/* 진행 길이는 완료율에 따라 달라지므로 inline style로 지정 */}
          <div
            className={twMerge('h-[9px] rounded-[999px] bg-[color:var(--color-primary)]')}
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
      <div className={twMerge('flex flex-row gap-[10px] w-[520px] mt-[28px]')}>
        <StatCard label="전체" value={totalCount} />
        <StatCard label="진행 중" value={inProgressCount} />
        <StatCard label="완료" value={completedCount} />
      </div>
    </section>
  );
}

export default Statistics;
