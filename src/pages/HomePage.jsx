import { useState } from 'react';
import Input from '../components/Input';
import FilterButtons from '../components/todo/FilterButtons';
import TodoItem from '../components/todo/TodoItem';
import TodoStats from '../components/todo/TodoStats';
import PageHeader from '../components/PageHeader';

function HomePage(props) {
  const [tab, setTab] = useState('list');
  const [displayWork, setDisplayWork] = useState('total');

  const display = props.tasks.filter((task) => {
    if (displayWork === 'inProgress') return task.done === false;
    return true;
  });

  const remainingCount = props.tasks.filter((task) => task.done === false).length;

  const tabMenu = (
    <div>
      <button onClick={() => setTab('list')}>할 일 목록</button>
      <button onClick={() => setTab('stats')}>통계</button>
    </div>
  );

  return (
    <main className="mx-auto flex max-w-[536px] flex-col gap-6 p-2">
      <PageHeader title="TodoMatic" linkTo="/completed" linkText="완료 목록 &rarr;" />

      {tab === 'list' ? (
        <>
          <section className="flex flex-col gap-2">
            {tabMenu}
            <Input newWork={props.onAdd} />
            <FilterButtons filter={displayWork} onChange={setDisplayWork} />
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-[17.6px] leading-[1.5] font-bold text-[#222]">
              남은 할 일 {remainingCount}개
            </h2>
            <div className="flex flex-col gap-2">
              {display.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onToggle={props.onToggle}
                  onDelete={props.onDelete}
                  onUpdate={props.onUpdate}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="flex flex-col gap-2">
          {tabMenu}
          <TodoStats tasks={props.tasks} />
        </section>
      )}
    </main>
  );
}

export default HomePage;
