const STORAGE_KEY = 'tasks';

// 저장된 값이 없거나 올바른 배열이 아니면 빈 목록으로 시작
export function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 저장 공간 부족 등으로 저장에 실패해도 앱은 현재 state로 계속 동작
export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // 저장 실패는 무시함
  }
}
