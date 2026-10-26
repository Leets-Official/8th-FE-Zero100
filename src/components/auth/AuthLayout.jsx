function AuthLayout(props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-noto">
      <section className="flex w-full max-w-md flex-col gap-6 rounded-[10px] bg-white p-8 outline -outline-offset-1 outline-gray-200">
        <h1 className="text-center text-2xl leading-8 font-bold text-black">{props.title}</h1>
        {props.children}
      </section>
    </main>
  );
}

export default AuthLayout;
