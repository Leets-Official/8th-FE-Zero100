import { Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import CompletedPage from './pages/CompletedPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/completed" element={<CompletedPage />} />
    </Routes>
  );
}

export default App;
