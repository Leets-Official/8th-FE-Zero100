import Button from '../../common/Button/Button';
import { TODO_FILTER_OPTIONS } from '../../../constants/todoFilter';

function TodoFilter({ currentFilter, onChangeFilter }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="할 일 필터">
      {TODO_FILTER_OPTIONS.map(({ value, label }) => {
        const isSelected = currentFilter === value;

        return (
          <Button
            key={value}
            variant={isSelected ? 'primary' : 'secondary'}
            aria-pressed={isSelected}
            onClick={() => onChangeFilter(value)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export default TodoFilter;
