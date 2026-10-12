import AppHeader from '../components/layout/AppHeader.jsx';
import TodoStats from '../components/todo/TodoStats.jsx';
import { useTodos } from '../hooks/useTodos.js';

function StatisticsPage() {
  const { todos } = useTodos();

  return (
    <main className="app-shell">
      <AppHeader />
      <TodoStats todos={todos} />
    </main>
  );
}

export default StatisticsPage;
