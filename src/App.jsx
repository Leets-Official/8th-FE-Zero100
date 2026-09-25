import CompletedTodoPage from './pages/CompletedTodoPage/CompletedTodoPage.jsx';
import TodoPage from './pages/TodoPage/TodoPage.jsx';

// 라우팅 도입 전 UI 확인용: ?page=completed 로 완료 페이지를 렌더링한다.
const isCompletedPage = new URLSearchParams(window.location.search).get('page') === 'completed';

function App() {
  return isCompletedPage ? <CompletedTodoPage /> : <TodoPage />;
}

export default App;
