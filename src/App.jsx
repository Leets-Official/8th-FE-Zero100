import { useState } from 'react';
import CompletedPage from './pages/CompletedPage.jsx';
import TodoPage from './pages/TodoPage.jsx';

function App() {
  const [showCompletedPage, setShowCompletedPage] = useState(false);

  return (
    <div className="app-background">
      {showCompletedPage ? (
        <CompletedPage onBack={() => setShowCompletedPage(false)} />
      ) : (
        <TodoPage onViewCompleted={() => setShowCompletedPage(true)} />
      )}
    </div>
  );
}

export default App;
