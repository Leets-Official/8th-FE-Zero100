import Text from '../components/commons/Text';
import TodoStats from '../components/todo/TodoStats';

export default function StatsPage() {
  return (
    <section className="stats-page" aria-labelledby="stats-heading">
      <Text as="h2" id="stats-heading" className="stats-heading">
        할 일 통계
      </Text>
      <Text className="stats-description">할 일을 얼마나 완료했는지 한눈에 확인하세요.</Text>
      <TodoStats />
    </section>
  );
}
