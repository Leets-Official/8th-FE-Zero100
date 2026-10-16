import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';
import Navigation from '../../components/Navigation/Navigation';
import Text from '../../components/Text/Text';
import { ROUTES } from '../../constants/routes';

import '../../App.css';

function StatsPage({ todos }) {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const summaryItems = [
    { label: '전체', value: totalCount },
    { label: '진행 중', value: activeCount },
    { label: '완료', value: completedCount },
  ];

  return (
    <main className="todo-app">
      <header className="page-header">
        <div className="header-top">
          <h1 className="logo-title">TodoMatic</h1>

          <Link to={ROUTES.TODO_COMPLETED} className="link-completed">
            완료 목록 →
          </Link>
        </div>

        <Navigation active="stats" />
      </header>

      <section className="stats-container">
        <div className="stats-heading">
          <Text as="h2" className="section-heading">
            할 일 통계
          </Text>

          <p className="stats-subtitle">전체 할 일의 진행 현황을 한눈에 확인해 보세요.</p>
        </div>

        <article className="stats-highlight">
          <div className="stats-highlight-top">
            <div className="stats-highlight-text">
              <h3 className="stats-highlight-title">완료율</h3>
              <p className="stats-highlight-desc">
                {totalCount === 0
                  ? '아직 등록된 할 일이 없어요.'
                  : `전체 ${totalCount}개 중 ${completedCount}개를 완료했어요.`}
              </p>
            </div>

            <strong className="stats-highlight-rate">{completionRate}%</strong>
          </div>

          <div
            className="stats-progress-track"
            role="progressbar"
            aria-label="전체 할 일 완료율"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completionRate}
          >
            <div className="stats-progress-bar" style={{ width: `${completionRate}%` }} />
          </div>
        </article>

        <div className="stats-summary">
          {summaryItems.map((item) => (
            <Card key={item.label} label={item.label} value={item.value} unit="개" />
          ))}
        </div>
      </section>
    </main>
  );
}

export default StatsPage;
