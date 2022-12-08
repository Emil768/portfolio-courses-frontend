import { NavLink } from "react-router-dom";
import styles from "./Categories.module.scss";

import { categoryNames } from "@internals";

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        <li className={styles.categories__item}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [styles.categories__linkActive, styles.categories__link].join(
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
              className={({ isActive }) =>
                isActive
                  ? [
                      styles.categories__linkActive,
                      styles.categories__link,
                    ].join(" ")
                  : styles.categories__link
              }
              to={`/category/${item.link}`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
