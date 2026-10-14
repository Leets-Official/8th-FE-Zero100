import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Completed() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('tasks');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'sans-serif',
      }}
    >
      <h2>완료된 할 일</h2>

      {completedTodos.length === 0 ? (
        <p>완료된 할 일이 없습니다.</p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          {completedTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                marginBottom: '10px',
                textDecoration: 'line-through',
                color: '#aaa',
              }}
            >
              ☑ {todo.text}
            </li>
          ))}
        </ul>
      )}

      <Link to="/">
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
}