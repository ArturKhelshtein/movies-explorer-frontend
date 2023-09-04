function MainSectionTitle({ title, styleTitle = '' }) {
  return (
    <>
      <h2 className="main-section__title">{title}</h2>
      <div
        className={`main-section__title-separator ${
          styleTitle ? `main-section__title-separator_type_${styleTitle}` : ''
        }`}
      />
    </>
  );
}

export default MainSectionTitle;
