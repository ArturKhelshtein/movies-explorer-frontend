import './AboutProject.css';

import MainSection from '../MainSection/MainSection';

function AboutProject() {
  return (
    <MainSection title="О проекте" id='aboutProject' styleTitle='about-project'>
      <div className="about-project-article">
        <article className="about-project-article__article">
          <h3 className="about-project-article__header">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project-article__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки
          </p>
        </article>
        <article className="about-project-article__article">
          <h3 className="about-project-article__header">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project-article__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься
          </p>
        </article>
      </div>
      <div className="about-project-timeline">
        <div className="about-project-timeline__timeline about-project-timeline__timeline_type_preparatory">
          1 неделя
        </div>
        <div className="about-project-timeline__timeline about-project-timeline__timeline_type_main">
          4 недели
        </div>
        <div className="about-project-timeline__timeline about-project-timeline__timeline_type_description">
          Back&#8209;end
        </div>
        <div className="about-project-timeline__timeline about-project-timeline__timeline_type_description">
          Front&#8209;end
        </div>
      </div>
    </MainSection>
  );
}

export default AboutProject;
