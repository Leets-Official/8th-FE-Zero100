import Button from '../Button/Button';

/** 서버 데이터를 불러오는 중이거나 실패했을 때 보여주는 안내. 실패하면 다시 시도 버튼을 함께 보여준다. */
function RequestStatus({ status, error, loadingMessage, onRetry }) {
  if (status === 'loading') {
    return (
      <p role="status" className="py-12 text-center text-sm text-dash-muted">
        {loadingMessage}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-[10px] border border-dash-line bg-white py-12">
      <p role="alert" className="text-sm text-dash-error">
        {error}
      </p>
      <Button variant="secondary" size="small" onClick={onRetry}>
        다시 시도
      </Button>
    </div>
  );
}

export default RequestStatus;
