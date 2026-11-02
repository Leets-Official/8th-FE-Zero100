import Button from '../common/Button';

import './SettingsCard.css';

const SettingsCard = ({ title, submitLabel = '변경', onSubmit, children }) => {
  return (
    <form className="settings-card" onSubmit={onSubmit}>
      <h3 className="settings-card__title">{title}</h3>

      {children}

      <div className="settings-card__actions">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};

export default SettingsCard;
