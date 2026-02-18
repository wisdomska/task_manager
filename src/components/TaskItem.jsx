import { useState } from 'react';

/**
 * TaskItem component — displays a single task card
 * with title, description, status dropdown, and delete button.
 * Status changes are reported via onStatusChange callback.
 * Delete requires confirmation before calling onDelete.
 *
 * Color-coded status: gray (To Do), blue (In Progress), green (Done).
 *
 * @param {Object} props
 * @param {Object} props.task - { id, title, description, status }
 * @param {Function} props.onStatusChange - Callback receiving (taskId, newStatus)
 * @param {Function} props.onDelete - Callback receiving (taskId)
 */
function TaskItem({ task, onStatusChange, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // Map status to CSS class for color-coded badges
    const statusClass = {
        'To Do': 'status-todo',
        'In Progress': 'status-in-progress',
        'Done': 'status-done',
    }[task.status] || 'status-todo';

    const handleStatusChange = (e) => {
        onStatusChange(task.id, e.target.value);
    };

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        onDelete(task.id);
        setShowConfirm(false);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <div className={`task-item ${statusClass}`} data-testid={`task-item-${task.id}`}>
            {showConfirm && (
                <div className="confirm-overlay" data-testid={`confirm-delete-${task.id}`}>
                    <div className="confirm-dialog">
                        <p>Delete &ldquo;{task.title}&rdquo;?</p>
                        <div className="confirm-actions">
                            <button
                                className="btn-confirm-delete"
                                onClick={handleConfirmDelete}
                                data-testid={`confirm-yes-${task.id}`}
                            >
                                Delete
                            </button>
                            <button
                                className="btn-cancel-delete"
                                onClick={handleCancelDelete}
                                data-testid={`confirm-no-${task.id}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
            </div>

            <div className="task-actions">
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

                <button
                    className="btn-delete"
                    onClick={handleDeleteClick}
                    aria-label={`Delete ${task.title}`}
                    data-testid={`delete-btn-${task.id}`}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
