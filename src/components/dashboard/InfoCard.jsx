function InfoCard(props) {
  return (
    <section className="flex flex-col gap-4 rounded-[10px] bg-white p-6 outline -outline-offset-1 outline-gray-200">
      <h2 className="text-lg leading-7 font-bold text-black">{props.title}</h2>
      <dl className="flex flex-col gap-3">
        {props.items.map((item) => (
          <div key={item.label} className="flex h-9 justify-between border-b border-gray-100 pt-2">
            <dt className="text-sm leading-5 text-gray-600">{item.label}</dt>
            <dd className="text-sm leading-5 font-medium text-black">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default InfoCard;
