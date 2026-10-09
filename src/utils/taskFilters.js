export const filterRules = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

export const filterLabels = {
  all: '전체 할 일',
  active: '진행 중인 할 일',
  completed: '완료한 할 일',
};
