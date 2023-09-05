import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
      <div className="nav-tab__container">
        <a href="#aboutProject" className="nav-tab__link">
          О&nbsp;проекте
        </a>
        <a href="#techs" className="nav-tab__link">
          Технологии
        </a>
        <a href="#aboutMe" className="nav-tab__link">
          Студент
        </a>
      </div>
    </section>
  );
}

export default NavTab;
