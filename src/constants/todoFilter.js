export const TODO_FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const TODO_FILTER_OPTIONS = [
  { value: TODO_FILTER.ALL, label: '전체보기' },
  { value: TODO_FILTER.ACTIVE, label: '진행 중' },
  { value: TODO_FILTER.COMPLETED, label: '완료됨' },
];

export const EMPTY_MESSAGE_BY_FILTER = {
  [TODO_FILTER.ALL]: '등록된 할 일이 없어요. 새 할 일을 추가해 보세요!',
  [TODO_FILTER.ACTIVE]: '진행 중인 할 일이 없어요.',
  [TODO_FILTER.COMPLETED]: '완료된 할 일이 없어요.',
};
