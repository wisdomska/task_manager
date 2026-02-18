/**
 * TaskFilter component — renders filter buttons for task status categories.
 * Shows task counts per filter and highlights the active filter.
 *
 * @param {Object} props
 * @param {Array} props.tasks - Full (unfiltered) tasks array for counting
 * @param {string} props.activeFilter - Currently active filter value
 * @param {Function} props.onFilterChange - Callback receiving the new filter value
 */
function TaskFilter({ tasks, activeFilter, onFilterChange }) {
    const filters = ['All', 'To Do', 'In Progress', 'Done'];

    // Count tasks per status
    const getCounts = () => {
        const counts = { 'All': tasks.length, 'To Do': 0, 'In Progress': 0, 'Done': 0 };
        tasks.forEach((task) => {
            if (counts[task.status] !== undefined) {
                counts[task.status]++;
            }
        });
        return counts;
    };

    const counts = getCounts();

    return (
        <div className="task-filter" data-testid="task-filter">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'filter-active' : ''}`}
                    onClick={() => onFilterChange(filter)}
                    data-testid={`filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                >
                    {filter}
                    <span className="filter-count">{counts[filter]}</span>
                </button>
            ))}
        </div>
    );
}

export default TaskFilter;
