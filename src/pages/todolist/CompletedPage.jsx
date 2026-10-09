import { Link } from 'react-router-dom';

import Text from '../../components/Text/Text';
import TodoList from '../../components/TodoList/TodoList';
import { ROUTES } from '../../constants/routes';

import '../../App.css';

function CompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="todo-app">
      <header className="page-header">
        <div className="header-top">
          <h1 className="logo-title">완료된 작업</h1>

          <Link to={ROUTES.TODO} className="link-completed">
            ← 진행 중 목록
          </Link>
        </div>
      </header>

      <section className="list-container">
        <Text as="h2" className="section-heading">
          완료된 목록 {completedTodos.length}개
        </Text>

        <TodoList
          todos={completedTodos}
          emptyMessage="완료한 할 일이 아직 없어요."
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </section>
    </main>
  );
}

export default CompletedPage;
