function Footer({ text = 'ZERO100 Admin' }) {
  return (
    <footer className="flex min-h-15 w-full shrink-0 items-center justify-end border-t border-dash-line bg-white px-6 text-sm leading-5 text-dash-text-sub">
      {text}
    </footer>
  );
}

export default Footer;
