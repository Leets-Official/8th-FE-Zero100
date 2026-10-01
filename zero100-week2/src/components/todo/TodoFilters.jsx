import Button from '../commons/Button';
import { FILTERS } from '../../constants/todos';

export default function TodoFilters({ filter, onFilterChange }) {
  return (
    <div className="filters" role="group" aria-label="작업 상태 필터">
      {FILTERS.map(({ value, label }) => (
        <Button
          key={value}
          variant={filter === value ? 'primary' : 'secondary'}
          aria-pressed={filter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
