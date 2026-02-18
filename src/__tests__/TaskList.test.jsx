import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TaskList from '../components/TaskList';

const mockTasks = [
    { id: '1', title: 'Task One', description: 'First task', status: 'To Do' },
    { id: '2', title: 'Task Two', description: '', status: 'In Progress' },
    { id: '3', title: 'Task Three', description: 'Third task', status: 'Done' },
];

describe('TaskList', () => {
    it('shows empty state message when no tasks exist', () => {
        render(<TaskList tasks={[]} onStatusChange={() => { }} />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    });

    it('shows empty state when tasks is null', () => {
        render(<TaskList tasks={null} onStatusChange={() => { }} />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });

    it('renders all tasks when tasks array is provided', () => {
        render(<TaskList tasks={mockTasks} onStatusChange={() => { }} />);
        expect(screen.getByTestId('task-list')).toBeInTheDocument();
        expect(screen.getByText('Task One')).toBeInTheDocument();
        expect(screen.getByText('Task Two')).toBeInTheDocument();
        expect(screen.getByText('Task Three')).toBeInTheDocument();
    });

    it('does not show empty state when tasks exist', () => {
        render(<TaskList tasks={mockTasks} onStatusChange={() => { }} />);
        expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });
});
