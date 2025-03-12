'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { useTodo } from '@/context/TodoContext';

// Priority badge colors
const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, updateTodo, deleteTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [showDetails, setShowDetails] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      updateTodo(todo.id, { title: editedTitle });
    }
    setIsEditing(!isEditing);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`border dark:border-gray-700 rounded-lg p-3 sm:p-4 mb-3 shadow-sm transition-all ${todo.completed ? 'bg-gray-50 dark:bg-gray-800 opacity-75' : 'bg-white dark:bg-gray-800'}`}>
      {/* Main row with checkbox, title, and actions */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2 sm:space-x-3 flex-1">
          {/* Checkbox */}
          <div className="pt-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
            />
          </div>

          {/* Todo content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-1 border dark:border-gray-600 rounded text-gray-900 dark:text-white font-medium dark:bg-gray-700 transition-colors duration-200"
                autoFocus
                onBlur={handleEdit}
                onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              />
            ) : (
              <div className="flex items-center justify-between">
                <h3 className={`text-base sm:text-lg font-medium truncate mr-2 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'} transition-colors duration-200`}>
                  {todo.title}
                </h3>
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 sm:hidden transition-colors duration-200"
                >
                  {showDetails ? 'Hide' : 'Details'}
                </button>
              </div>
            )}

            {/* Metadata - visible on larger screens or when details are shown */}
            <div className={`mt-1 flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 ${!showDetails && 'hidden sm:flex'} transition-colors duration-200`}>
              {/* Priority badge - always show */}
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${priorityColors[todo.priority]} transition-colors duration-200`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              
              {/* Category if exists */}
              {todo.category && (
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs font-medium px-2 py-0.5 rounded transition-colors duration-200">
                  {todo.category}
                </span>
              )}
              
              {/* Created date */}
              <span>Created: {formatDate(todo.createdAt)}</span>

              {/* Due date if exists */}
              {todo.dueDate && (
                <span className={`${new Date(todo.dueDate) < new Date() && !todo.completed ? 'text-red-500 dark:text-red-400 font-medium' : ''} transition-colors duration-200`}>
                  Due: {formatDate(todo.dueDate)}
                </span>
              )}
            </div>

            {/* Notes if exists - visible on larger screens or when details are shown */}
            {todo.notes && (
              <p className={`mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 ${!showDetails && 'hidden sm:block'} transition-colors duration-200`}>
                {todo.notes}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 ml-2 sm:ml-4">
          <button
            onClick={handleEdit}
            className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            aria-label={isEditing ? "Save" : "Edit"}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            aria-label="Delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 