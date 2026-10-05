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
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">완료율</span>
          <span className="font-bold">{rate}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${rate}%` }} />
        </div>
      </div>
    </section>
  );
};

export default Stats;
