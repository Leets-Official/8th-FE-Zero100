import Button from './Button';
import Icon from './Icon';

export default function AsyncState({ status, error, onRetry, children }) {
  if (status === 'loading') {
    return (
      <div className="loading-state" role="status" aria-live="polite">
        <p>데이터를 불러오는 중이에요.</p>
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton skeleton--short" />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="error-state" role="alert">
        <Icon name="alert" size={26} />
        <h3>데이터를 불러오지 못했어요</h3>
        <p>{error}</p>
        <Button onClick={onRetry}>다시 시도</Button>
      </div>
    );
  }
  return children;
}
