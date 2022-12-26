import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { UserPanel } from "@components";
import { useAppSelector } from "@redux/hooks";

import LogoIcon from "../../img/logo.png";
import { useState } from "react";

export const Header = () => {
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={"/tests"}>
          <img src={LogoIcon} className={styles.header__logo} alt="logo" />
        </Link>
        <div className={styles.header__panel}>
          <div
            className={styles.menuBtn}
            onClick={() => setMenuActive(!menuActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul
            className={
              menuActive
                ? [styles.header__list, styles.header__listActive].join(" ")
                : styles.header__list
            }
          >
            <li className={styles.header__item}>
              <a className={styles.header__link} href="#about">
                Обо мне
              </a>
            </li>
            <li className={styles.header__item}>
              <a className={styles.header__link} href="#programs">
                Программа курса
              </a>
            </li>
            <li className={styles.header__item}>
              <a className={styles.header__link} href="#tariffs">
                Тарифы
              </a>
            </li>

            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/"}
              >
                Тесты
              </NavLink>
            </li>
          </ul>
          {isAuth ? <UserPanel /> : null}
        </div>
      </div>
    </header>
  );
};
