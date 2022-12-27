import styles from "./Home.module.scss";

import SamoletIcon from "@images/gallery/samolet.webp";
import JournalIcon from "@images/gallery/journal.webp";
import MapIcon from "@images/gallery/map.webp";

import { SquareIcon } from "@images/icons";

export const Home = () => (
  <section className={styles.home}>
    <div className={styles.home__content}>
      <div className={styles.home__contentText} data-aos="zoom-in-right">
        <div data-aos="fade-right" className={styles.imageWrapper}>
          <img
            src={SamoletIcon}
            className={[styles.imageSamolet, styles.rotate].join(" ")}
            alt="samolet"
          />
        </div>
        <h1 className={styles.home__title}>Английский для начинающих</h1>
        <p className={styles.home__subtitle}>
          Сделай первый шаг навстречу английскому без ошибок с
          учителем-билингвой
        </p>
        <q className={styles.home__quote}>
          <i>Enjoy English u know, discover English u don't.</i>
        </q>
        <a className={styles.home__button} href="#tariffs">
          Записаться
        </a>
      </div>
      <div className={styles.home__contentImage}>
        <div className={styles.imageWrapper} data-aos="fade-down-left">
          {" "}
          <img
            src={JournalIcon}
            className={[styles.imageJournal, styles.rotate].join(" ")}
            alt="journale"
          />
        </div>
        <img src={MapIcon} className={styles.home__author} alt="world" />
        <div
          className={styles.home__contentImage}
          data-aos="fade-up-right"
          data-aos-anchor=".image-journal"
        >
          <SquareIcon
            className={[styles.imageSquare, styles.rotate].join(" ")}
          />
        </div>
      </div>
    </div>
  </section>
);
