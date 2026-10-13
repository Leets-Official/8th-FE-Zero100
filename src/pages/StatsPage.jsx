import PageHeading from '../components/commons/PageHeading';
import TodoStats from '../components/todo/TodoStats';

export default function StatsPage() {
  return (
    <>
      <PageHeading title="할 일 통계" description="차곡차곡 쌓인 나의 진행 상황을 확인하세요." />
      <div className="stats-container">
        <TodoStats />
      </div>
    </>
  );
}
