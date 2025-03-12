'use client';

import { useTodo } from '@/context/TodoContext';

export default function TodoStats() {
  const { todos } = useTodo();
  
  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Count by priority
  const priorityCounts = {
    high: todos.filter(todo => todo.priority === 'high').length,
    medium: todos.filter(todo => todo.priority === 'medium').length,
    low: todos.filter(todo => todo.priority === 'low').length,
  };
  
  // Find overdue tasks (tasks with due date in the past and not completed)
  const overdueTasks = todos.filter(todo => 
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 border-t-4 border-purple-500 transition-colors duration-200">
      <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-indigo-700 dark:text-indigo-400">Task Statistics</h2>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {/* First row: Total and Active */}
        <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-md text-center transition-colors duration-200">
          <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">{totalTasks}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Total Tasks</div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900 p-2 sm:p-3 rounded-md text-center transition-colors duration-200">
          <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-300">{activeTasks}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Active</div>
        </div>
        
        {/* Second row: Completed and Completion Rate */}
        <div className="bg-green-50 dark:bg-green-900 p-2 sm:p-3 rounded-md text-center transition-colors duration-200">
          <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-300">{completedTasks}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Completed</div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900 p-2 sm:p-3 rounded-md text-center transition-colors duration-200">
          <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-300">{completionRate}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Completion Rate</div>
        </div>
      </div>
      
      {/* Priority breakdown */}
      <div className="mt-3 sm:mt-4">
        <h3 className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1 sm:mb-2">Priority Breakdown</h3>
        <div className="flex h-3 sm:h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 transition-colors duration-200">
          {priorityCounts.high > 0 && (
            <div 
              className="bg-red-500 dark:bg-red-600 transition-colors duration-200" 
              style={{ width: `${(priorityCounts.high / totalTasks) * 100}%` }}
              title={`High: ${priorityCounts.high}`}
            ></div>
          )}
          {priorityCounts.medium > 0 && (
            <div 
              className="bg-yellow-500 dark:bg-yellow-600 transition-colors duration-200" 
              style={{ width: `${(priorityCounts.medium / totalTasks) * 100}%` }}
              title={`Medium: ${priorityCounts.medium}`}
            ></div>
          )}
          {priorityCounts.low > 0 && (
            <div 
              className="bg-blue-500 dark:bg-blue-600 transition-colors duration-200" 
              style={{ width: `${(priorityCounts.low / totalTasks) * 100}%` }}
              title={`Low: ${priorityCounts.low}`}
            ></div>
          )}
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
          <div>Low: {priorityCounts.low}</div>
          <div>Medium: {priorityCounts.medium}</div>
          <div>High: {priorityCounts.high}</div>
        </div>
      </div>
      
      {/* Overdue tasks */}
      {overdueTasks > 0 && (
        <div className="mt-3 sm:mt-4 bg-red-50 dark:bg-red-900 p-2 sm:p-3 rounded-md transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-300">Overdue Tasks</div>
            <div className="text-base sm:text-lg font-bold text-red-600 dark:text-red-300">{overdueTasks}</div>
          </div>
        </div>
      )}
    </div>
  );
} 