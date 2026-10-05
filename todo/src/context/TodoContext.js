import { createContext, useContext } from 'react';

export const TodoContext = createContext(null);

export const useTodos = () => useContext(TodoContext);
