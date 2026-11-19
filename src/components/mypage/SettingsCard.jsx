import Button from '../common/Button';

import './SettingsCard.css';

const SettingsCard = ({
  title,
  submitLabel = '변경',
  isSubmitting = false,
  onSubmit,
  children,
}) => {
  return (
    <form className="settings-card" onSubmit={onSubmit} noValidate>
      <h3 className="settings-card__title">{title}</h3>

      {children}

      <div className="settings-card__actions">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '변경 중...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default SettingsCard;
