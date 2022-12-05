import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { UserPanel } from "@components";
import { useAppSelector } from "@redux/hooks";

import LogoIcon from "../../img/logo.png";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={"/tests"}>
          <img src={LogoIcon} className={styles.header__logo} alt="logo" />
        </Link>
        <div className={styles.menuBtn}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={styles.header__list}>
          <li className={styles.header__listItem}>
            <a className={styles.header__listLink} href="#about">
              Обо мне
            </a>
          </li>
          <li className={styles.header__listItem}>
            <a className={styles.header__listLink} href="#programs">
              Программа курса
            </a>
          </li>
          <li className={styles.header__listItem}>
            <a className={styles.header__listLink} href="#tariffs">
              Тарифы
            </a>
          </li>

          <li className={styles.header__listItem}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? [styles.header__listLink, styles.header__listActive].join(
                      " "
                    )
                  : styles.header__listLink
              }
              to={"/tests"}
            >
              Тесты
            </NavLink>
          </li>
          {isAuth ? <UserPanel /> : null}
        </ul>
      </div>
    </header>
  );
};
