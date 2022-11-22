import { Link } from "react-router-dom";
import { TestProps } from "../../propTypes";
import styles from "./InfoPanel.module.scss";

interface InfoPanelProps extends TestProps {}

export const InfoPanel = ({ category, viewsCount, user }: InfoPanelProps) => {
  const date: Date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour24: true,
  };

  return (
    <div className={styles.fullTest__info}>
      <span>
        <i className={styles.circle}></i>{" "}
        <Link
          to={`/category/${category}`}
          className={styles.fullTest__category}
        >
          {category}
        </Link>
      </span>
      <span className={styles.fullTest__icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
        {viewsCount}
      </span>
      <span className={styles.fullTest__date}>
        {/* {date.toLocaleDateString("ru-RU", options )} */}
        {String(date.toLocaleString("ru-RU"))}
      </span>
      <span className={styles.author}>
        <img
          src={`${user.avatarUrl.url}`}
          alt=""
          className={styles.author__avatar}
        />
        <span className={styles.author__name}>{user.fullName}</span>
      </span>
    </div>
  );
};
