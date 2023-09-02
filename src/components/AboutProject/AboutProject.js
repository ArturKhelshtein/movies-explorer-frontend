import './AboutProject.css';

import MainSection from '../MainSection/MainSection';

function AboutProject() {
  return (
    <MainSection title="О проекте" id='aboutProject'>
      <dev className="about-project__article-container">
        <article className="about-project__article">
          <h3 className="about-project__article-header">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__article-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки
          </p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__article-header">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__article-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защитится
          </p>
        </article>
      </dev>
      <dev className="about-project__timeline-container">
        <dev className="about-project__timeline about-project__timeline_type_preparatory">
          1 неделя
        </dev>
        <dev className="about-project__timeline about-project__timeline_type_main">
          4 недели
        </dev>
        <dev className="about-project__timeline about-project__timeline_type_description">
          Back&#8209;end
        </dev>
        <dev className="about-project__timeline about-project__timeline_type_description">
          Front&#8209;end
        </dev>
      </dev>
    </MainSection>
  );
}

export default AboutProject;
