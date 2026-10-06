function PageLayout({ children }) {
  return (
    <div className="flex flex-col p-[8px]">
      <div className="flex flex-col gap-[24px] w-[520px]">{children}</div>
    </div>
  );
}

export default PageLayout;
