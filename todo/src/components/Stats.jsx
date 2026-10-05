import { useTodos } from '../context/TodoContext';

const Stats = () => {
  const { todos } = useTodos();

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const items = [
    { label: '전체', value: total },
    { label: '진행 중', value: active },
    { label: '완료', value: completed },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold">할 일 통계</h2>
        <p className="mt-1 text-sm text-gray-500">할 일을 얼마나 완료했는지 한눈에 확인하세요.</p>
      </div>

      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">완료율</p>
            <p className="mt-1 text-xs text-gray-500">
              전체 {total}개 중 {completed}개를 완료했어요.
            </p>
          </div>
          <span className="text-3xl font-bold text-indigo-600">{rate}%</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-indigo-100">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${rate}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-1">
              <span className="text-xl font-bold">{item.value}</span>
              <span className="ml-1 text-xs text-gray-400">개</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
