import { NavLink } from "react-router-dom";
import styles from "./Categories.module.scss";

import { categoryNames } from "@data";

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        <li className={styles.categories__item}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [styles.categories__link, styles.categories__linkActive].join(
                    " "
                  )
                : styles.categories__link
            }
            to={"/tests"}
          >
            Все
          </NavLink>
        </li>
        {categoryNames.map((item, index) => (
          <li key={index} className={styles.categories__item}>
            <NavLink
              to={`/category/${item.link}`}
              className={({ isActive }) =>
                isActive
                  ? [
                      styles.categories__link,
                      styles.categories__linkActive,
                    ].join(" ")
                  : styles.categories__link
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
