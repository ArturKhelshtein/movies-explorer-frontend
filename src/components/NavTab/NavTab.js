import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
			<h2 className='nav-tab__header'>Панель навигации</h2>
      <a href="#aboutProject" className="nav-tab__link">О&nbsp;проекте</a>
			<a href="#techs" className="nav-tab__link">Технологии</a>
			<a href="#aboutMe" className="nav-tab__link">Студент</a>
    </section>
  );
}

export default NavTab;
