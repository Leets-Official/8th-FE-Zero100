import type { ReactNode } from 'react';
import Button from './ButtonView';

interface ResourcePanelProps {
  status: 'loading' | 'success' | 'error';
  error: string;
  onRetry: () => void;
  children: ReactNode;
}

export default function ResourcePanel({ status, error, onRetry, children }: ResourcePanelProps) {
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
