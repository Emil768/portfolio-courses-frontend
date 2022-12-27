import styles from "./Programs.module.scss";

import HeadphonesIcon from "@images/gallery/headphones.webp";
import MusicIcon from "@images/gallery/music.webp";

export const Programs = () => (
  <section className={styles.programs}>
    <div className={styles.programs__content}>
      <h1
        className={[styles.programs__title, styles.title].join(" ")}
        data-aos="fade-right"
      >
        ПРОГРАММА КУРСА
      </h1>
      <div className={styles.programs__contentInfo}>
        <div className={styles.imageWrapper} data-aos="fade-down-right">
          <img
            className={[styles.imagePlayer, styles.rotate].join(" ")}
            src={MusicIcon}
            alt="music"
          />
        </div>
        <div className={styles.programs__block} data-aos="fade-left">
          <img
            className={styles.programs__blockSlice}
            src="img/slice0.png"
            alt=""
          />
          <span className={styles.programs__blockNumber}>01</span>
          <div className={styles.programs__blockInfo}>
            <h1 className={styles.programs__blockTitle}>
              Алфавит и правила чтения
            </h1>
            <p className={styles.programs__blockText}>
              В этом разделе вы познакомитесь с алфавитом, фонетикой,
              произношением и ударением в английском языке. Научитесь читать
              новые слова, а также выучите первые слова на английском.
            </p>
          </div>
        </div>
        <div className={styles.programs__block} data-aos="fade-left">
          <img
            className={styles.programs__blockSlice}
            src="img/slice2.png"
            alt=""
          />
          <span className={styles.programs__blockNumber}>01</span>
          <div className={styles.programs__blockInfo}>
            <h1 className={styles.programs__blockTitle}>
              Алфавит и правила чтения
            </h1>
            <p className={styles.programs__blockText}>
              Познакомимся с правилами построения утвердительных, отрицательных
              и вопросительных предложений.{" "}
            </p>
          </div>
        </div>
        <div className={styles.programs__block} data-aos="fade-left">
          <img
            className={styles.programs__blockSlice}
            src="img/slice3.png"
            alt=""
          />
          <span className={styles.programs__blockNumber}>01</span>
          <div className={styles.programs__blockInfo}>
            <h1 className={styles.programs__blockTitle}>
              Алфавит и правила чтения
            </h1>
            <p className={styles.programs__blockText}>
              В этом разделе вы выучите основные выражения для начинающих: фразы
              используемые при знакомстве, приветствие в зависимости от времени
              суток, фразы для шопинга, для путешествий, для досуга (посещения
              кино, театра, ресторана, выставки, зоопарка)
            </p>
          </div>
        </div>
        <div className={styles.programs__block} data-aos="fade-left">
          <img
            className={styles.programs__blockSlice}
            src="img/slice4.png"
            alt=""
          />
          <span className={styles.programs__blockNumber}>01</span>
          <div className={styles.programs__blockInfo}>
            <h1 className={styles.programs__blockTitle}>
              Алфавит и правила чтения
            </h1>
            <p className={styles.programs__blockText}>
              Подробно изучим: Present Continuous · Present Simple · Past Simple
              · Past Continuous · Present Perfect · Future Simple.
            </p>
          </div>
        </div>
        <div className={styles.programs__block} data-aos="fade-left">
          <img
            className={styles.programs__blockSlice}
            src="img/slice3.png"
            alt=""
          />
          <span className={styles.programs__blockNumber}>01</span>
          <div className={styles.programs__blockInfo}>
            <h1 className={styles.programs__blockTitle}>
              Алфавит и правила чтения
            </h1>
            <p className={styles.programs__blockText}>
              Употребление some, any, many, much, a lot of. Различия и нюансы
              употребления.
            </p>
          </div>
        </div>
        <div className={styles.programs__block} data-aos="fade-left">
          <img
            className={styles.programs__blockSlice}
            src="img/slice0.png"
            alt=""
          />
          <span className={styles.programs__blockNumber}>01</span>
          <div className={styles.programs__blockInfo}>
            <h1 className={styles.programs__blockTitle}>
              Алфавит и правила чтения
            </h1>
            <p className={styles.programs__blockText}>
              В этом разделе, мы изучим как правильно говорить о времени.
              Употребление past, half past, to, quarter и различные примеры
              употребления.
            </p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up-left">
        <img
          className={[styles.imagePhone, styles.rotate].join(" ")}
          src={HeadphonesIcon}
          alt="headphones"
        />
      </div>
    </div>
  </section>
);
