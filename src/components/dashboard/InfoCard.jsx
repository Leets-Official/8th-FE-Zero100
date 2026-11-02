import { useId } from 'react';

import './InfoCard.css';

const InfoCard = ({ title, rows = [] }) => {
  const titleId = useId();

  return (
    <section className="info-card" aria-labelledby={titleId}>
      <h3 id={titleId} className="info-card__title">
        {title}
      </h3>

      <dl className="info-card__list">
        {rows.map((row) => (
          <div key={row.label} className="info-card__row">
            <dt className="info-card__label">{row.label}</dt>
            <dd className="info-card__value">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default InfoCard;