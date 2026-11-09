// useTodos의 addTodo가 생성하는 할 일 (id는 crypto.randomUUID)
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
