export const STORAGE_KEY = 'zero100-week3-tasks';

export function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return {
        tasks: [],
        warning: '',
        persistEnabled: true,
      };
    }

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
        ) {
          return false;
        }

        ids.add(task.id);
        return true;
      })
    ) {
      throw new Error('Invalid stored tasks');
    }

    return {
      tasks,
      warning: '',
      persistEnabled: true,
    };
  } catch {
    // 손상된 저장 데이터는 로딩 직후 덮어쓰지 않습니다.
    return {
      tasks: [],
      warning:
        '저장된 목록을 읽지 못했어요. 빈 목록으로 시작합니다. 새 작업을 추가하면 새 목록 저장을 시도합니다.',
      persistEnabled: false,
    };
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return '';
  } catch {
    return '브라우저에 저장하지 못했어요. 현재 화면에서는 사용할 수 있지만 새로고침하면 변경 내용이 사라질 수 있습니다.';
  }
}
