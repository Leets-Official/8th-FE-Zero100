import Text from '../commons/Text';
import TodoItem from './TodoItem';
import { useTasks } from '../../hooks/useTasks';

const emptyMessages = {
  all: '등록된 할 일이 없어요. 첫 할 일을 추가해 보세요.',
  active: '진행 중인 할 일이 없어요.',
  completed: '아직 완료한 할 일이 없어요.',
};

export default function TodoList({ filter }) {
  const { tasks, toggleTask, editTask, deleteTask } = useTasks();
  const visibleTasks = tasks.filter(
    (task) => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed),
  );
  if (visibleTasks.length === 0)
    return (
      <Text className="empty-message" role="status">
        {emptyMessages[filter]}
      </Text>
    );
  return (
    <ul className="todo-list" aria-label="할 일 목록">
      {visibleTasks.map((task) => (
        <TodoItem
          key={task.id}
          todo={task}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      ))}
    </ul>
  );
}
