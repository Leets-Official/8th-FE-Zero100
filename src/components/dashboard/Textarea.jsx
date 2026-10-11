import { useId } from 'react';
import TextInput from './TextInput';

function Textarea(props) {
  const { label, helperText, error, ...inputProps } = props;
  const id = useId();
  const messageId = `${id}-message`;
  const hasMessage = Boolean(error || helperText);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm leading-5 font-medium text-gray-700">
        {label}
      </label>
      <TextInput
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={hasMessage ? messageId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={messageId} role="alert" className="text-xs leading-5 text-red-500">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={messageId} className="text-[10px] leading-4 text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}

export default Textarea;
