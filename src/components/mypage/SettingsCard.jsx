function SettingsCard(props) {
  return (
    <section className="flex flex-col gap-3 rounded-[10px] bg-white p-5 outline -outline-offset-1 outline-gray-200">
      <h2 className="text-lg leading-7 font-bold text-black">{props.title}</h2>
      {props.children}
    </section>
  );
}

export default SettingsCard;
