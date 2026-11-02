function InfoCard({ title, items }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6 sm:p-7">
      <h2 className="mb-5 text-base font-semibold">{title}</h2>
      <dl className="space-y-5">
        {items.map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-5 text-sm">
            <dt className="shrink-0 text-muted">{label}</dt>
            <dd className="text-right break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default InfoCard;
