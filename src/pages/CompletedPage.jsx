import TodoItem from '../components/todo/TodoItem';
import PageHeader from '../components/PageHeader';

function CompletedPage(props) {
  const completedTasks = props.tasks.filter((task) => task.done === true);

  return (
    <div className="app">
      <PageHeader title="완료된 작업" linkTo="/" linkText="&larr; 진행 중 목록" />

      <p className="midText">완료된 목록 {completedTasks.length}개</p>

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
  );
}

export default CompletedPage;
