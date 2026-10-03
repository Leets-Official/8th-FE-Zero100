import { Navigate, Route, Routes } from 'react-router';
import CompletedPage from './pages/CompletedPage.jsx';
import TodoPage from './pages/TodoPage.jsx';

function App() {
  return (
    <div className="app-background">
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
