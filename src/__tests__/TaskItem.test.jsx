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
        render(<TaskItem task={baseTask} onStatusChange={() => { }} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('A test description')).toBeInTheDocument();
    });

    it('does not render description when it is empty', () => {
        const task = { ...baseTask, description: '' };
        render(<TaskItem task={task} onStatusChange={() => { }} />);
        expect(screen.queryByText('A test description')).not.toBeInTheDocument();
    });

    it('renders status dropdown with correct value', () => {
        render(<TaskItem task={baseTask} onStatusChange={() => { }} />);
        const select = screen.getByTestId('status-select-42');
        expect(select).toHaveValue('To Do');
    });

    it('calls onStatusChange when status is changed', async () => {
        const mockChange = vi.fn();
        const user = userEvent.setup();
        render(<TaskItem task={baseTask} onStatusChange={mockChange} />);

        const select = screen.getByTestId('status-select-42');
        await user.selectOptions(select, 'In Progress');

        expect(mockChange).toHaveBeenCalledWith('42', 'In Progress');
    });

    it('applies correct CSS class for "To Do" status', () => {
        render(<TaskItem task={baseTask} onStatusChange={() => { }} />);
        const item = screen.getByTestId('task-item-42');
        expect(item).toHaveClass('status-todo');
    });

    it('applies correct CSS class for "In Progress" status', () => {
        const task = { ...baseTask, status: 'In Progress' };
        render(<TaskItem task={task} onStatusChange={() => { }} />);
        const item = screen.getByTestId('task-item-42');
        expect(item).toHaveClass('status-in-progress');
    });

    it('applies correct CSS class for "Done" status', () => {
        const task = { ...baseTask, status: 'Done' };
        render(<TaskItem task={task} onStatusChange={() => { }} />);
        const item = screen.getByTestId('task-item-42');
        expect(item).toHaveClass('status-done');
    });
});
