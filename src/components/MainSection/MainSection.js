import './MainSection.css';

import MainSectionTitle from '../MainSectionTitle/MainSectionTitle';

function MainSection({ title, id, children, styleTitle, style = '' }) {
  return (
    <section
      id={id}
      className={`main-section ${style ? `main-section_type_${style}` : ''}`}
    >
      <MainSectionTitle title={title} styleTitle={styleTitle} />
      <div className="main-section__content">{children}</div>
    </section>
  );
}

export default MainSection;
