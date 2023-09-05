import { Link } from 'react-router-dom';

import './LogoLink.css';

import IconLogo from '../IconLogo/IconLogo';

function LogoLink() {
  return (
    <Link to="/" className="logo">
      <IconLogo />
    </Link>
  );
}

export default LogoLink;
