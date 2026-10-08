const STORAGE_KEY = 'zero100-todos';

/** 저장된 할 일 목록을 불러온다. 처음 접속했거나 저장값이 깨졌으면 빈 목록으로 시작한다. */
export const loadTodos = () => {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // 시크릿 모드 등으로 저장이 막혀 있어도 앱은 계속 쓸 수 있게 조용히 넘어간다.
  }
};
