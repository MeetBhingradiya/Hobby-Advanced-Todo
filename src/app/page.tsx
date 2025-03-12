'use client';

import { TodoProvider } from '@/context/TodoContext';
import TodoForm from '@/components/TodoForm';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';
import TodoStats from '@/components/TodoStats';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <TodoProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 transition-colors duration-200">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <header className="mb-4 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Advanced Todo App</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Organize your tasks with categories, priorities, and due dates</p>
          </header>

          {/* On mobile: Stats at top, then Form, then List, then Filter at bottom */}
          <div className="md:hidden space-y-4">
            <TodoStats />
            <TodoForm />
            <TodoList />
            <TodoFilter />
          </div>

          {/* On medium screens and up: sidebar layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-4 lg:space-y-6">
              <TodoStats />
              <TodoFilter />
            </div>

            {/* Main content */}
            <div className="md:col-span-2 space-y-4 lg:space-y-6">
              <TodoForm />
              <TodoList />
            </div>
          </div>
        </div>
        
        {/* Theme Toggle Button */}
        <ThemeToggle />
      </main>
    </TodoProvider>
  );
}
