import { Link } from 'react-router';
import { useTodos } from '../../hooks/useTodos.js';
import Text from '../common/Text.jsx';

function AppHeader({ title = 'TodoMatic', subtitle, isCompletedPage = false }) {
  const { todos } = useTodos();
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <header className="app-header">
        <div>
          <Text as="h1" variant="title" tabIndex={-1} data-page-heading>
            {title}
          </Text>
          {subtitle && (
            <Text as="p" variant="subtitle">
              {subtitle}
            </Text>
          )}
        </div>
        {isCompletedPage ? (
          <Link to="/" className="text-link">
            <span aria-hidden="true">←</span> 할 일 목록
          </Link>
        ) : (
          <Link
            to="/completed"
            className="text-link"
            aria-label={`완료 목록 보기, 완료된 할 일 ${completedCount}개`}
          >
            완료 목록 <span aria-hidden="true">→</span>
          </Link>
        )}
      </header>
    </>
  );
}

export default AppHeader;
