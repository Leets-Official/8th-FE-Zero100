import Button from '../Button';

function FilterButtons(props) {
  return (
    <div className="displayRow">
      <Button
        variant={props.filter === 'total' ? 'primary' : 'default'}
        onClick={() => props.onChange('total')}
      >
        전체보기
      </Button>
      <Button
        variant={props.filter === 'inProgress' ? 'primary' : 'default'}
        onClick={() => props.onChange('inProgress')}
      >
        진행 중
      </Button>
    </div>
  );
}

export default FilterButtons;
