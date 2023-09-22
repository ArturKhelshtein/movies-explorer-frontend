import './MainSection.css';

function MainSection({ title, id, children, style, bgcolorstyle }) {
  return (
    <section
      id={id}
      className={`main-section ${bgcolorstyle ? `main-section_type_${bgcolorstyle}` : '' }`}
    >
      <div className={`main-section__container ${style ? `main-section__container_type_${style}` : ''}`}>
        <h2 className="main-section__title">{title}</h2>
        <div
          className={`main-section__title-separator ${
            style ? `main-section__title-separator_type_${style}` : ''
          }`}
        />
        <div className="main-section__content">{children}</div>
      </div>
    </section>
  );
}

export default MainSection;
