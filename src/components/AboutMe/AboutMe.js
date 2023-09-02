import { Link } from 'react-router-dom';

import './AboutMe.css';

import photo from '../../images/PhotoMe.jpg';
import MainSection from '../MainSection/MainSection';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <MainSection title="Студент" id="aboutMe">
      <dev className="about-me__description">
        <dev className="about-me__description-text">
          <dev className="about-me__description-text-container">
            <h3 className="about-me__header">Артур</h3>
            <h4 className="about-me__subheader">
						Фронтенд&#8209;разработчик, 34&nbsp;года
            </h4>
            <p className="about-me__paragraph">
              Заканчиваю обучение на&nbsp;курсе Веб&#8209;разработчик от
              Яндекс.Практикум. За&nbsp;время обучения изучили следующий стек
              технологий JavaScript, Node.JS, Express.JS, React, Webpack, NPM,
              Git, CSS, HTML5. Ранее работал проектировщиком газоснабжения,
              дорос до&nbsp;начальника отдела проектирования, но&nbsp;всегда
              хотел начать программировать.
            </p>
          </dev>
          <Link
            to="https://github.com/ArturKhelshtein"
            className="about-me__link"
            target="_blank"
          >
            Github
          </Link>
        </dev>
        <img className="about-me__photo" src={photo} alt="фото студента" />
      </dev>
      <Portfolio />
    </MainSection>
  );
}

export default AboutMe;
