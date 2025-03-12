'use client';

import { useState, FormEvent } from 'react';
import { useTodo } from '@/context/TodoContext';

export default function TodoForm() {
  const { addTodo, categories } = useTodo();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTodo({
      title: title.trim(),
      completed: false,
      priority,
      category: category === 'new' ? newCategory.trim() : category || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      notes: notes.trim() || undefined,
    });
    
    // Reset form
    setTitle('');
    setPriority('medium');
    setCategory('');
    setNewCategory('');
    setDueDate('');
    setNotes('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6 mb-4 sm:mb-6 border-t-4 border-indigo-500 transition-colors duration-200">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-indigo-700 dark:text-indigo-400">Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Title input - always visible */}
        <div className="mb-3 sm:mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>
        </div>
        
        {/* Expanded form fields */}
        {isExpanded && (
          <div className="space-y-3 sm:space-y-4">
            {/* Priority selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Priority</label>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {['low', 'medium', 'high'].map((p) => (
                  <label key={p} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p as 'low' | 'medium' | 'high')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-900 dark:text-gray-300 capitalize">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Category selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="new">+ Add New Category</option>
              </select>
              
              {category === 'new' && (
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-2 w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
                  required
                />
              )}
            </div>
            
            {/* Due date */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Due Date (Optional)</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
              />
            </div>
            
            {/* Notes */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
                placeholder="Add any additional details..."
              ></textarea>
            </div>
          </div>
        )}
        
        {/* Submit button */}
        <div className="mt-3 sm:mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
} 