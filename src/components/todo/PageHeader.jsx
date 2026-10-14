import { Link } from 'react-router-dom';

function PageHeader(props) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-[40px] leading-[60px] font-bold text-[#111]">{props.title}</h1>
      <Link to={props.linkTo} className="text-base leading-[1.275] font-semibold text-indigo-600">
        {props.linkText}
      </Link>
    </header>
  );
}

export default PageHeader;
