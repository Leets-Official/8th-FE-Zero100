function Toast({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="fixed right-4 bottom-6 left-4 z-50 flex items-center gap-3 rounded-lg border border-line bg-white px-5 py-4 shadow-lg sm:right-6 sm:left-auto sm:max-w-md">
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand" />
      <p role="status" className="flex-1 text-sm leading-6">
        {message}
      </p>
      <button
        type="button"
        aria-label="알림 닫기"
        onClick={onDismiss}
        className="ml-3 rounded p-1 text-muted hover:text-brand"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
