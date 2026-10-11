export function getTodoStats(todos) {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return {
    totalCount,
    completedCount,
    activeCount: totalCount - completedCount,
    completionRate: totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
  };
}
