import { useTodos } from '../../hooks/useTodos.js';

const messages = {
  ready: '목록을 불러왔어요. 변경한 내용은 자동으로 저장돼요.',
  saving: '변경 내용을 저장하고 있어요.',
  saved: '변경 내용을 저장했어요.',
};

const errorMessages = {
  load: '저장된 목록을 불러오지 못했어요. 기존 데이터를 보호하기 위해 자동 저장을 중단했어요. 저장소 문제를 해결한 뒤 새로고침해 주세요.',
  save: '목록을 저장하지 못했어요. 새로고침하면 변경 내용이 사라질 수 있어요. 다음 변경 때 다시 저장을 시도해요.',
};

function TodoStorageStatus() {
  const { storageStatus, storageError } = useTodos();
  const hasError = storageStatus === 'error';

  return (
    <p
      className={`storage-status${hasError ? ' storage-status--error' : ''}`}
      role={hasError ? 'alert' : 'status'}
    >
      {hasError ? errorMessages[storageError] : messages[storageStatus]}
    </p>
  );
}

export default TodoStorageStatus;
