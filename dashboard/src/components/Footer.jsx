const Footer = ({ text = 'ZERO100 Admin' }) => {
  return (
    <footer className="flex h-[60px] w-full items-center justify-end border-t border-[#E5E7EB] bg-white px-6">
      <p className="text-sm text-[#4A5565]">{text}</p>
    </footer>
  );
};

export default Footer;
