const Header = ({ title = 'ZERO100 Admin', actionLabel = '로그아웃', onAction }) => {
  return (
    <header className="common-component common-header">
      <h1 className="common-header__title">{title}</h1>

      <button type="button" className="common-header__action" onClick={onAction}>
        {actionLabel}
      </button>
    </header>
  );
};

export default Header;
