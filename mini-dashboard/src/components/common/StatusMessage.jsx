import Button from './Button.jsx';

function StatusMessage({ status, children, onRetry }) {
  const isError = status === 'error';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className="rounded-lg border border-line bg-white p-8 text-center"
    >
      <p className={isError ? 'text-sm text-[#c92a2a]' : 'text-sm text-muted'}>{children}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}

export default StatusMessage;
