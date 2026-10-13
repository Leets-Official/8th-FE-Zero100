import { useId } from 'react';
import Icon from './Icon';

export default function TextInput({
  label,
  hideLabel = false,
  search = false,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const id = props.id ?? generatedId;
  return (
    <div className={`text-field ${className}`}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'field-label'}>
        {label}
      </label>
      <div className="field-control">
        {search && <Icon name="search" />}
        <input {...props} id={id} className={`text-input ${search ? 'text-input--search' : ''}`} />
      </div>
    </div>
  );
}
