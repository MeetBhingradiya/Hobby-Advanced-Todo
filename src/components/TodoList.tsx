'use client';

import { useTodo } from '@/context/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { filteredTodos } = useTodo();

  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-8 text-center transition-colors duration-200">
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">No tasks found.</p>
        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1 sm:mt-2">Add a new task or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      
      <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-right transition-colors duration-200">
        {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'} found
      </div>
    </div>
  );
} 