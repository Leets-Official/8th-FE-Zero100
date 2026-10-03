import TodoItem from '../components/todo/TodoItem';
import PageHeader from '../components/PageHeader';

function CompletedPage(props) {
  const completedTasks = props.tasks.filter((task) => task.done === true);

  return (
    <main className="mx-auto flex max-w-[536px] flex-col gap-6 p-2">
      <PageHeader title="완료된 작업" linkTo="/" linkText="&larr; 진행 중 목록" />

      <section className="flex flex-col gap-2">
        <h2 className="text-[17.6px] leading-[1.5] font-bold text-[#222]">
          완료된 목록 {completedTasks.length}개
        </h2>
        <div className="flex flex-col gap-2">
          {completedTasks.map((task) => (
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
    </main>
  );
}

export default CompletedPage;
