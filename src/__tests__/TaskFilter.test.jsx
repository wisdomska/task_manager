import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TaskFilter from '../components/TaskFilter';

const mockTasks = [
    { id: '1', title: 'Task 1', description: '', status: 'To Do' },
    { id: '2', title: 'Task 2', description: '', status: 'To Do' },
    { id: '3', title: 'Task 3', description: '', status: 'In Progress' },
    { id: '4', title: 'Task 4', description: '', status: 'In Progress' },
    { id: '5', title: 'Task 5', description: '', status: 'Done' },
];

describe('TaskFilter', () => {
    it('renders all four filter buttons', () => {
        render(<TaskFilter tasks={mockTasks} activeFilter="All" onFilterChange={() => { }} />);
        expect(screen.getByTestId('filter-all')).toBeInTheDocument();
        expect(screen.getByTestId('filter-to-do')).toBeInTheDocument();
        expect(screen.getByTestId('filter-in-progress')).toBeInTheDocument();
        expect(screen.getByTestId('filter-done')).toBeInTheDocument();
    });

    it('displays correct task counts per filter', () => {
        render(<TaskFilter tasks={mockTasks} activeFilter="All" onFilterChange={() => { }} />);
        expect(screen.getByTestId('filter-all')).toHaveTextContent('5');
        expect(screen.getByTestId('filter-to-do')).toHaveTextContent('2');
        expect(screen.getByTestId('filter-in-progress')).toHaveTextContent('2');
        expect(screen.getByTestId('filter-done')).toHaveTextContent('1');
    });

    it('highlights the active filter', () => {
        render(<TaskFilter tasks={mockTasks} activeFilter="In Progress" onFilterChange={() => { }} />);
        const activeBtn = screen.getByTestId('filter-in-progress');
        expect(activeBtn).toHaveClass('filter-active');
        expect(screen.getByTestId('filter-all')).not.toHaveClass('filter-active');
    });

    it('calls onFilterChange when a filter button is clicked', async () => {
        const mockChange = vi.fn();
        const user = userEvent.setup();
        render(<TaskFilter tasks={mockTasks} activeFilter="All" onFilterChange={mockChange} />);

        await user.click(screen.getByTestId('filter-done'));
        expect(mockChange).toHaveBeenCalledWith('Done');
    });
});
