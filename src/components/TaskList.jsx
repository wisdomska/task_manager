import TaskItem from './TaskItem';

/**
 * TaskList component — renders a list of tasks or an empty state message.
 * Each task is rendered via the TaskItem component.
 *
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects
 * @param {Function} props.onStatusChange - Callback for status changes
 */
function TaskList({ tasks, onStatusChange }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="task-list-empty" data-testid="empty-state">
                <p>No tasks yet. Create one to get started.</p>
            </div>
        );
    }

    return (
        <div className="task-list" data-testid="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    );
}

export default TaskList;
