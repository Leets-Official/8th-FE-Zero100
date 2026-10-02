import { TODO_FILTER } from '../constants/todoFilter';

export const filterTodos = (todos, filter) => {
  if (filter === TODO_FILTER.ACTIVE) return todos.filter((todo) => !todo.isCompleted);
  if (filter === TODO_FILTER.COMPLETED) return todos.filter((todo) => todo.isCompleted);
  return todos;
};
