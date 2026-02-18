/**
 * TaskItem component — displays a single task card
 * with title, description, and a status dropdown.
 * Status changes are reported via onStatusChange callback.
 *
 * Color-coded status: gray (To Do), blue (In Progress), green (Done).
 *
 * @param {Object} props
 * @param {Object} props.task - { id, title, description, status }
 * @param {Function} props.onStatusChange - Callback receiving (taskId, newStatus)
 */
function TaskItem({ task, onStatusChange }) {
    // Map status to CSS class for color-coded badges
    const statusClass = {
        'To Do': 'status-todo',
        'In Progress': 'status-in-progress',
        'Done': 'status-done',
    }[task.status] || 'status-todo';

    const handleStatusChange = (e) => {
        onStatusChange(task.id, e.target.value);
    };

    return (
        <div className={`task-item ${statusClass}`} data-testid={`task-item-${task.id}`}>
            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
            </div>

            <div className="task-status">
                <label htmlFor={`status-${task.id}`} className="sr-only">
                    Status for {task.title}
                </label>
                <select
                    id={`status-${task.id}`}
                    className={`status-select ${statusClass}`}
                    value={task.status}
                    onChange={handleStatusChange}
                    data-testid={`status-select-${task.id}`}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </div>
    );
}

export default TaskItem;
