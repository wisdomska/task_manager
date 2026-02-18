import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
    it('renders form with title input, description textarea, and submit button', () => {
        render(<TaskForm onAddTask={() => { }} />);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    });

    it('shows validation error when submitting with empty title', async () => {
        const user = userEvent.setup();
        render(<TaskForm onAddTask={() => { }} />);

        await user.click(screen.getByRole('button', { name: /add task/i }));

        expect(screen.getByRole('alert')).toHaveTextContent('Task title is required');
    });

    it('does not call onAddTask when title is empty', async () => {
        const mockAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskForm onAddTask={mockAdd} />);

        await user.click(screen.getByRole('button', { name: /add task/i }));

        expect(mockAdd).not.toHaveBeenCalled();
    });

    it('calls onAddTask with correct data on valid submission', async () => {
        const mockAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskForm onAddTask={mockAdd} />);

        await user.type(screen.getByLabelText(/title/i), 'My Test Task');
        await user.type(screen.getByLabelText(/description/i), 'Task details');
        await user.click(screen.getByRole('button', { name: /add task/i }));

        expect(mockAdd).toHaveBeenCalledTimes(1);
        const newTask = mockAdd.mock.calls[0][0];
        expect(newTask.title).toBe('My Test Task');
        expect(newTask.description).toBe('Task details');
        expect(newTask.status).toBe('To Do');
        expect(newTask.id).toBeDefined();
    });

    it('clears form fields after successful submission', async () => {
        const user = userEvent.setup();
        render(<TaskForm onAddTask={() => { }} />);

        const titleInput = screen.getByLabelText(/title/i);
        const descInput = screen.getByLabelText(/description/i);

        await user.type(titleInput, 'A task');
        await user.type(descInput, 'Some description');
        await user.click(screen.getByRole('button', { name: /add task/i }));

        expect(titleInput).toHaveValue('');
        expect(descInput).toHaveValue('');
    });

    it('clears validation error when user starts typing', async () => {
        const user = userEvent.setup();
        render(<TaskForm onAddTask={() => { }} />);

        // Trigger error
        await user.click(screen.getByRole('button', { name: /add task/i }));
        expect(screen.getByRole('alert')).toBeInTheDocument();

        // Start typing — error should disappear
        await user.type(screen.getByLabelText(/title/i), 'a');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('enforces maxLength on title (100 chars)', () => {
        render(<TaskForm onAddTask={() => { }} />);
        expect(screen.getByLabelText(/title/i)).toHaveAttribute('maxLength', '100');
    });

    it('enforces maxLength on description (500 chars)', () => {
        render(<TaskForm onAddTask={() => { }} />);
        expect(screen.getByLabelText(/description/i)).toHaveAttribute('maxLength', '500');
    });
});
