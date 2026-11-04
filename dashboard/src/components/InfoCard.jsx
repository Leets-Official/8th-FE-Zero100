const InfoCard = ({ title, items }) => {
  return (
    <section className="flex flex-col gap-4 rounded-[10px] border border-[#E5E7EB] bg-white p-6">
      <h3 className="text-lg font-bold text-black">{title}</h3>
      <dl className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-[#F3F4F6] pb-3"
          >
            <dt className="text-sm text-[#4A5565]">{item.label}</dt>
            <dd className="text-sm font-medium text-black">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default InfoCard;
