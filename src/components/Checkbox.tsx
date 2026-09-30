interface Props {
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ checked, onChange }: Props) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ cursor: 'pointer' }}
    />
  );
};