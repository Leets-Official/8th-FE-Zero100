export const STORAGE_KEY = 'zero100-week3-tasks';

export function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return { tasks: [], warning: '', persistEnabled: true };
    const tasks = JSON.parse(saved);
    const ids = new Set();
    if (
      !Array.isArray(tasks) ||
      !tasks.every((task) => {
        if (
          !task ||
          typeof task.id !== 'string' ||
          !task.id ||
          ids.has(task.id) ||
          typeof task.text !== 'string' ||
          !task.text.trim() ||
          typeof task.completed !== 'boolean'
        )
          return false;
        ids.add(task.id);
        return true;
      })
    )
      throw new Error('Invalid stored tasks');
    return { tasks, warning: '', persistEnabled: true };
  } catch {
    // 손상된 저장 내용은 로딩 직후 덮어쓰지 않습니다. 사용자가 변경하면 새 목록을 저장합니다.
    return {
      tasks: [],
      warning:
        '저장된 목록을 읽지 못했어요. 빈 목록으로 시작합니다. 새 작업을 추가하면 새 목록 저장을 시도합니다.',
      persistEnabled: false,
    };
  }
}
