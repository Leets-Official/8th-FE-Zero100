export default function PageHeading({ title, description, children }) {
  return (
    <div className="page-heading flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">MY WORKSPACE</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}
