interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ checked, onChange }: Props) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        cursor: 'pointer',
        width: '16px',
        height: '16px',
        accentColor: '#000000',
      }}
    />
  );
};