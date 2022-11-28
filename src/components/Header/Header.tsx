import styles from "./Header.module.scss";
import logoIcon from "../../img/logo.png";
import { Link, NavLink } from "react-router-dom";
import { UserPanel } from "../UserPanel";
import { useAppSelector } from "../../redux/hooks";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={"/"}>
          <img className={styles.header__logo} src={logoIcon} alt="" />
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
