import './Card.css';

function Card({ label, value, unit = '', className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      <span className="card-label">{label}</span>

      <strong className="card-value">
        {value}
        {unit && <span className="card-unit">{unit}</span>}
      </strong>
    </article>
  );
}

export default Card;
