import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { UserPanel } from "@components";
import { useAppSelector } from "@redux/hooks";

import { LogoIcon } from "@images/gallery";
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
                ? isAuth
                  ? [
                      styles.header__list,
                      styles.header__listAuth,
                      styles.header__listActive,
                    ].join(" ")
                  : [styles.header__list, styles.header__listActive].join(" ")
                : styles.header__list
            }
          >
            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/"}
              >
                Обо мне
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/programs"}
              >
                Программа курса
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/tariffs"}
              >
                Тарифы
              </NavLink>
            </li>

            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/tests"}
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
