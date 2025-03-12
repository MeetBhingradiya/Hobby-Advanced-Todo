'use client';

import { useState, useEffect } from 'react';
import { useTodo } from '@/context/TodoContext';

export default function TodoFilter() {
  const { filter, setFilter, categories } = useTodo();
  const [searchQuery, setSearchQuery] = useState(filter.searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter({ searchQuery });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, setFilter]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 border-t-4 border-blue-500 transition-colors duration-200">
      <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-indigo-700 dark:text-indigo-400">Filter Tasks</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Search input */}
        <div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
          />
        </div>
        
        {/* Status filter */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Status</label>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {['all', 'active', 'completed'].map((status) => (
              <label key={status} className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  checked={filter.status === status}
                  onChange={() => setFilter({ status: status as 'all' | 'active' | 'completed' })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-900 dark:text-gray-300 capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Priority filter */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Priority</label>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ priority: e.target.value as 'all' | 'low' | 'medium' | 'high' })}
            className="w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        {/* Category filter */}
        {categories.length > 0 && (
          <div>
            <label className="block text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Category</label>
            <select
              value={filter.category || ''}
              onChange={(e) => setFilter({ category: e.target.value || null })}
              className="w-full p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700 transition-colors duration-200"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Reset filters button */}
        <div>
          <button
            onClick={() => {
              setFilter({
                status: 'all',
                priority: 'all',
                category: null,
                searchQuery: '',
              });
              setSearchQuery('');
            }}
            className="w-full py-2 px-4 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
} 