import styles from "./Home.module.scss";

import { SamoletIcon, MapIcon_1 } from "@images/gallery";

import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className={styles.home}>
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
            Enjoy English u know, discover English u don't.
          </q>
          <Link className={styles.home__button} to={"/tariffs"}>
            Записаться
          </Link>
        </div>
        <div className={styles.home__contentImage}>
          <img src={MapIcon_1} className={styles.home__author} alt="world" />
        </div>
      </div>
    </div>
  );
};
