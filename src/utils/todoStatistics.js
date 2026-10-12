export function getTodoStatistics(todos) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return {
    total,
    active: total - completed,
    completed,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
