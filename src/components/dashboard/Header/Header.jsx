function Header({ title = 'ZERO100 Admin', actionLabel, onAction }) {
  return (
    <header className="flex h-15 w-full shrink-0 items-center justify-between gap-6 border-b border-dash-line bg-white px-6">
      <p className="text-xl leading-7 font-bold text-dash-black">{title}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 rounded-sm text-sm leading-5 font-medium text-dash-text-sub hover:text-dash-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted"
        >
          {actionLabel}
        </button>
      )}
    </header>
  );
}

export default Header;
