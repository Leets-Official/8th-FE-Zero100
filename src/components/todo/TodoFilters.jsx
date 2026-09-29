import Button from '../common/Button.jsx'

const filters = [
  { value: 'all', label: '전체 보기' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료됨' },
]

function TodoFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="todo-filters" role="group" aria-label="할 일 필터">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'filter-active' : 'filter'}
          aria-pressed={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

export default TodoFilters
