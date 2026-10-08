export const TODO_FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
};

// 완료된 할 일은 /completed 페이지에서 따로 보여주므로 필터는 두 가지만 둔다.
export const TODO_FILTER_OPTIONS = [
  { value: TODO_FILTER.ALL, label: '전체보기' },
  { value: TODO_FILTER.ACTIVE, label: '진행 중' },
];

export const EMPTY_MESSAGE_BY_FILTER = {
  [TODO_FILTER.ALL]: '등록된 할 일이 없어요. 새 할 일을 추가해 보세요!',
  [TODO_FILTER.ACTIVE]: '진행 중인 할 일이 없어요.',
};
