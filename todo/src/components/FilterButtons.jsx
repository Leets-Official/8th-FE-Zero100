import Button from './common/Button';

const FILTERS = [
  { key: 'all', label: '전체보기' },
  { key: 'active', label: '진행 중' },
];

const FilterButtons = ({ filter, onChangeFilter }) => {
  return (
    <div className="filter-buttons">
      {FILTERS.map(({ key, label }) => (
        <Button
          key={key}
          variant="filter"
          active={filter === key}
          onClick={() => onChangeFilter(key)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
