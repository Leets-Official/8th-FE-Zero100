import Button from './Button';

export default function AsyncPanel({ status, error, onRetry, children }) {
  if (status === 'loading')
    return (
      <div className="async-panel" role="status">
        <span className="loading-dot" aria-hidden="true" />
        불러오는 중입니다.
      </div>
    );
  if (status === 'error')
    return (
      <div className="async-panel async-panel--error" role="alert">
        <p>{error}</p>
        <Button variant="secondary" onClick={onRetry}>
          다시 시도
        </Button>
      </div>
    );
  return children;
}
