'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, TodoFilter } from '@/types/todo';

interface TodoContextType {
  todos: Todo[];
  filter: TodoFilter;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: Partial<TodoFilter>) => void;
  filteredTodos: Todo[];
  categories: string[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilterState] = useState<TodoFilter>({
    status: 'all',
    priority: 'all',
    category: null,
    searchQuery: '',
  });

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        // Convert string dates back to Date objects
        const formattedTodos = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        setTodos(formattedTodos);
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Generate a unique ID (normally we'd use a library like uuid)
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: generateId(),
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, updatedFields: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const setFilter = (newFilter: Partial<TodoFilter>) => {
    setFilterState({ ...filter, ...newFilter });
  };

  // Get filtered todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    // Filter by status
    if (filter.status === 'active' && todo.completed) return false;
    if (filter.status === 'completed' && !todo.completed) return false;

    // Filter by priority
    if (filter.priority !== 'all' && todo.priority !== filter.priority) return false;

    // Filter by category
    if (filter.category && todo.category !== filter.category) return false;

    // Filter by search query
    if (filter.searchQuery && !todo.title.toLowerCase().includes(filter.searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Get unique categories
  const categories = Array.from(new Set(todos.map((todo) => todo.category).filter(Boolean) as string[]));

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        setFilter,
        filteredTodos,
        categories,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 