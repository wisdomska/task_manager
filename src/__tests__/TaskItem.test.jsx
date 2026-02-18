import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from '../components/TaskItem';

const baseTask = {
    id: '42',
    title: 'Test Task',
    description: 'A test description',
    status: 'To Do',
};

describe('TaskItem', () => {
    it('renders task title and description', () => {
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={() => { }} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('A test description')).toBeInTheDocument();
    });

    it('does not render description when it is empty', () => {
        const task = { ...baseTask, description: '' };
        render(<TaskItem task={task} onStatusChange={() => { }} onDelete={() => { }} />);
        expect(screen.queryByText('A test description')).not.toBeInTheDocument();
    });

    it('renders status dropdown with correct value', () => {
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={() => { }} />);
        const select = screen.getByTestId('status-select-42');
        expect(select).toHaveValue('To Do');
    });

    it('calls onStatusChange when status is changed', async () => {
        const mockChange = vi.fn();
        const user = userEvent.setup();
        render(<TaskItem task={baseTask} onStatusChange={mockChange} onDelete={() => { }} />);

        const select = screen.getByTestId('status-select-42');
        await user.selectOptions(select, 'In Progress');

        expect(mockChange).toHaveBeenCalledWith('42', 'In Progress');
    });

    it('applies correct CSS class for "To Do" status', () => {
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={() => { }} />);
        const item = screen.getByTestId('task-item-42');
        expect(item).toHaveClass('status-todo');
    });

    it('applies correct CSS class for "In Progress" status', () => {
        const task = { ...baseTask, status: 'In Progress' };
        render(<TaskItem task={task} onStatusChange={() => { }} onDelete={() => { }} />);
        const item = screen.getByTestId('task-item-42');
        expect(item).toHaveClass('status-in-progress');
    });

    it('applies correct CSS class for "Done" status', () => {
        const task = { ...baseTask, status: 'Done' };
        render(<TaskItem task={task} onStatusChange={() => { }} onDelete={() => { }} />);
        const item = screen.getByTestId('task-item-42');
        expect(item).toHaveClass('status-done');
    });

    // ---- Delete functionality tests ----
    it('renders a delete button', () => {
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={() => { }} />);
        expect(screen.getByTestId('delete-btn-42')).toBeInTheDocument();
    });

    it('shows confirmation dialog when delete is clicked', async () => {
        const user = userEvent.setup();
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={() => { }} />);

        await user.click(screen.getByTestId('delete-btn-42'));
        expect(screen.getByTestId('confirm-delete-42')).toBeInTheDocument();
    });

    it('calls onDelete when deletion is confirmed', async () => {
        const mockDelete = vi.fn();
        const user = userEvent.setup();
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={mockDelete} />);

        await user.click(screen.getByTestId('delete-btn-42'));
        await user.click(screen.getByTestId('confirm-yes-42'));

        expect(mockDelete).toHaveBeenCalledWith('42');
    });

    it('does not call onDelete when deletion is cancelled', async () => {
        const mockDelete = vi.fn();
        const user = userEvent.setup();
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={mockDelete} />);

        await user.click(screen.getByTestId('delete-btn-42'));
        await user.click(screen.getByTestId('confirm-no-42'));

        expect(mockDelete).not.toHaveBeenCalled();
    });

    it('hides confirmation dialog after cancelling', async () => {
        const user = userEvent.setup();
        render(<TaskItem task={baseTask} onStatusChange={() => { }} onDelete={() => { }} />);

        await user.click(screen.getByTestId('delete-btn-42'));
        expect(screen.getByTestId('confirm-delete-42')).toBeInTheDocument();

        await user.click(screen.getByTestId('confirm-no-42'));
        expect(screen.queryByTestId('confirm-delete-42')).not.toBeInTheDocument();
    });
});
