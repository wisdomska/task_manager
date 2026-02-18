import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import './App.css';

/**
 * App — main component for the Task Management Dashboard.
 * Manages tasks state with localStorage persistence.
 * Provides handlers for adding, deleting, updating status, and filtering tasks.
 */
function App() {
  const [tasks, setTasks] = useLocalStorage('taskManager_tasks', []);
  const [activeFilter, setActiveFilter] = useState('All');

  // Add a new task to the list
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Delete a task by id
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Update the status of an existing task
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Filter tasks based on active filter
  const filteredTasks = activeFilter === 'All'
    ? tasks
    : tasks.filter((task) => task.status === activeFilter);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="app-subtitle">Organize and track your tasks</p>
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <TaskForm onAddTask={addTask} />
        </aside>

        <section className="app-content">
          <div className="task-list-header">
            <h2>My Tasks</h2>
            <span className="task-count">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            </span>
          </div>

          <TaskFilter
            tasks={tasks}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <TaskList
            tasks={filteredTasks}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
