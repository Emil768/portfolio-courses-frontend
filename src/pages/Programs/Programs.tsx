import styles from "./Programs.module.scss";

import { HeadphonesIcon, MusicIcon } from "@images/gallery";
import { programsData } from "@internals";

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
        {programsData.map((item, index) => (
          <div
            className={styles.programs__block}
            data-aos="fade-left"
            key={index}
          >
            <img
              className={styles.programs__blockSlice}
              src={item.slice}
              alt="slice"
            />
            <span className={styles.programs__blockNumber}>{item.id}</span>
            <div className={styles.programs__blockInfo}>
              <h1 className={styles.programs__blockTitle}>{item.title}</h1>
              <p className={styles.programs__blockText}>{item.body}</p>
            </div>
          </div>
        ))}
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
