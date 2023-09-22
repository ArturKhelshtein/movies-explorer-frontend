import './Techs.css';

import MainSection from '../MainSection/MainSection';

function Techs() {
  return (
    <MainSection
      title="Технологии"
      id="techs"
      bgcolorstyle={`techs`}
      style={`techs`}
    >
      <div className="techs">
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__paragraph">
          На курсе веб&#8209;разработки мы освоили технологии, которые применили
          в&nbsp;дипломном проекте
        </p>
        <div className="techs__container">
          <div className="techs__container-element">HTML</div>
          <div className="techs__container-element">CSS</div>
          <div className="techs__container-element">JS</div>
          <div className="techs__container-element">React</div>
          <div className="techs__container-element">Git</div>
          <div className="techs__container-element">Express.js</div>
          <div className="techs__container-element">mongoDB</div>
        </div>
      </div>
    </MainSection>
  );
}

export default Techs;
