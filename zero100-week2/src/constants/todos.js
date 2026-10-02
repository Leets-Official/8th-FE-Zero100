// 화면 확인을 위한 예시 데이터. 새로고침하면 이 초기 상태로 돌아갑니다.
export const INITIAL_TODOS = [
  { id: 'sample-1', text: 'React 컴포넌트 복습하기', completed: true },
  { id: 'sample-2', text: 'Todo list 기능 구현하기', completed: false },
  { id: 'sample-3', text: 'GitHub에 과제 PR 올리기', completed: false },
];

export const FILTERS = [
  { value: 'all', label: '전체보기' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료됨' },
];

export const EMPTY_MESSAGES = {
  all: '등록된 할 일이 없어요. 새로운 할 일을 추가해 보세요.',
  active: '진행 중인 할 일이 없어요. 모두 완료했어요!',
  completed: '아직 완료한 할 일이 없어요. 체크박스를 눌러 완료해 보세요.',
};

export const COUNT_LABELS = {
  all: '전체 할 일',
  active: '진행 중인 할 일',
  completed: '완료된 할 일',
};
