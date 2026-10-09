import { Link } from 'react-router';

function PageHeader({ title, navLabel, navTo, subtitle }) {
  return (
    <header className="flex flex-col self-stretch gap-[16px]">
      <div className="flex flex-row items-center self-stretch gap-[10px]">
        <h1 className="flex flex-col flex-[1_1_0] min-w-0 h-[60px] m-0 font-[family-name:var(--font-family-base)] font-extrabold text-[40px] leading-[60px] tracking-[-0.5px] text-[color:var(--color-text-primary)]">
          {title}
        </h1>
        <Link
          className="flex-none m-0 p-0 border-none bg-transparent bg-none font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-[20.4px] tracking-[0px] text-[color:var(--color-primary)] no-underline"
          to={navTo}
        >
          {navLabel}
        </Link>
      </div>
      {subtitle && (
        <div className="flex flex-col self-stretch gap-[10px]">
          <h2 className="flex flex-col w-[520px] h-[27px] m-0 font-[family-name:var(--font-family-base)] font-medium text-[20px] leading-[26.4px] tracking-[0px] text-[color:var(--color-text-secondary)]">
            {subtitle}
          </h2>
        </div>
      )}
    </header>
  );
}

export default PageHeader;
