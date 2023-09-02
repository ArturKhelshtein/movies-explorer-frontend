import './MainSectionTitle.css';

function MainSectionTitle({ title }) {
  return (
    <>
      <h2 className="main__section-title">{title}</h2>
      <div className="main__section-title-separator" />
    </>
  );
}

export default MainSectionTitle;
