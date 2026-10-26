function PageHeading({ title, action, description }) {
  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 tabIndex={-1} data-page-heading className="text-2xl font-bold tracking-tight">
          {title}
        </h1>
        {action}
      </div>
      {description && <p className="mt-2 text-sm leading-6 text-muted">{description}</p>}
    </div>
  );
}

export default PageHeading;
