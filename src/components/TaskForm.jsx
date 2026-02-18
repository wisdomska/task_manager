import { useState } from 'react';

/**
 * TaskForm component — allows users to create a new task
 * with a title (required, max 100 chars) and description (optional, max 500 chars).
 * Validates that title is non-empty before submitting.
 * Clears form fields after successful submission.
 *
 * @param {Object} props
 * @param {Function} props.onAddTask - Callback receiving { id, title, description, status }
 */
function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate title is not empty or whitespace-only
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            setError('Task title is required');
            return;
        }

        // Create new task object
        const newTask = {
            id: Date.now().toString(),
            title: trimmedTitle,
            description: description.trim(),
            status: 'To Do',
        };

        onAddTask(newTask);

        // Clear form fields and error
        setTitle('');
        setDescription('');
        setError('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit} data-testid="task-form">
            <h2>Create New Task</h2>

            <div className="form-group">
                <label htmlFor="task-title">Title *</label>
                <input
                    id="task-title"
                    type="text"
                    placeholder="Enter task title..."
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (error) setError('');
                    }}
                    maxLength={100}
                    aria-required="true"
                    aria-invalid={!!error}
                />
                <div className="form-meta">
                    {error && <span className="error-message" role="alert">{error}</span>}
                    <span className="char-count">{title.length}/100</span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    placeholder="Enter task description (optional)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                    rows={3}
                />
                <div className="form-meta">
                    <span className="char-count">{description.length}/500</span>
                </div>
            </div>

            <button type="submit" className="btn-primary">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;
