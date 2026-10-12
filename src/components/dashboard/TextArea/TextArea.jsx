import { cn } from '../../../utils/cn';
import { FIELD_CLASS_NAME } from '../fieldClassName';
import FormField from '../FormField/FormField';

function TextArea({
  id,
  label,
  helperText,
  error,
  placeholder = '텍스트를 입력하세요',
  className = '',
  ...rest
}) {
  return (
    <FormField id={id} label={label} helperText={helperText} error={error}>
      {(fieldProps) => (
        <textarea
          placeholder={placeholder}
          className={cn(FIELD_CLASS_NAME, 'min-h-30 resize-y', className)}
          {...fieldProps}
          {...rest}
        />
      )}
    </FormField>
  );
}

export default TextArea;
