import './MainSection.css';

import MainSectionTitle from '../MainSectionTitle/MainSectionTitle';

function MainSection({ title, id, children, style = '' }) {
  return (
    <section id={id} className={`main__section ${style}`}>
      <MainSectionTitle title={title} />
      <div className="main__content">{children}</div>
    </section>
  );
}

export default MainSection;
