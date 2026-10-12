import { TODO_FILTER } from '../constants/todoFilter';

export const filterTodos = (todos, filter) => {
  if (filter === TODO_FILTER.ACTIVE) return todos.filter((todo) => !todo.isCompleted);
  return todos;
};

export const getCompletedTodos = (todos) => todos.filter((todo) => todo.isCompleted);
