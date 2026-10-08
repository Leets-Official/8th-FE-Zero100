import { useEffect, useState } from 'react';
import { loadTodos, saveTodos } from '../../utils/todoStorage';
import { TodoContext } from './TodoContext';

function TodoProvider({ children }) {
  // 함수를 넘기면 첫 렌더링 때 한 번만 localStorage를 읽는다.
  const [todos, setTodos] = useState(loadTodos);

  // 목록이 바뀔 때마다 localStorage에 저장한다.
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text, isCompleted: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <TodoContext value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext>
  );
}

export default TodoProvider;
