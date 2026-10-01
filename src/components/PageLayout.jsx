import { twMerge } from 'tailwind-merge';

function PageLayout({ children }) {
  return (
    <div className={twMerge('flex flex-col p-[8px]')}>
      <div className={twMerge('flex flex-col gap-[24px] w-[520px]')}>{children}</div>
    </div>
  );
}

export default PageLayout;
