import { Link } from 'react-router-dom';

import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
      <a href="#aboutProject" className="nav-tab__link">О&nbsp;проекте</a>
			<a href="#techs" className="nav-tab__link">Технологии</a>
			<a href="#aboutMe" className="nav-tab__link">Студент</a>
    </section>
  );
}

export default NavTab;
