import { cn } from '../../../utils/cn';
import { FIELD_CLASS_NAME } from '../fieldClassName';
import FormField from '../FormField/FormField';

function TextInput({
  id,
  label,
  helperText,
  error,
  type = 'text',
  placeholder = '텍스트를 입력하세요',
  className = '',
  ...rest
}) {
  return (
    <FormField id={id} label={label} helperText={helperText} error={error}>
      {(fieldProps) => (
        <input
          type={type}
          placeholder={placeholder}
          className={cn(FIELD_CLASS_NAME, className)}
          {...fieldProps}
          {...rest}
        />
      )}
    </FormField>
  );
}

export default TextInput;
