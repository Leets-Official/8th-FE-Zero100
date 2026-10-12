/** 할 일 목록으로 통계를 계산한다. 통계는 따로 state로 두지 않아서 목록이 바뀌면 바로 다시 계산된다. */
export const getTodoStats = (todos) => {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const activeCount = totalCount - completedCount;
  // 할 일이 0개면 0으로 나누게 되므로 완료율을 0%로 둔다.
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return { totalCount, activeCount, completedCount, completionRate };
};
