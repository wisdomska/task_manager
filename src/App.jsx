import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

/**
 * App — main component for the Task Management Dashboard.
 * Manages the tasks array state and provides handlers for
 * adding tasks and updating task status.
 */
function App() {
  const [tasks, setTasks] = useState([]);

  // Add a new task to the list
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update the status of an existing task
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

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
            <span className="task-count">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
          </div>
          <TaskList tasks={tasks} onStatusChange={updateTaskStatus} />
        </section>
      </main>
    </div>
  );
}

export default App;
