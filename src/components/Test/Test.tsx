import { Link } from "react-router-dom";
import { TestProps } from "../../propTypes";
import styles from "./Test.module.scss";

import { ReactComponent as DisLikeIcon } from "../../img/like.svg";
import { ReactComponent as LikeIcon } from "../../img/dislike.svg";

export const Test = ({
  _id,
  title,
  text,
  category,
  user,
  backgroundImage,
}: TestProps) => {
  return (
    <div className={styles.note}>
      <img
        className={styles.note__backgroundImage}
        src={backgroundImage}
        alt=""
      />
      <div className={styles.note__content}>
        <span className={styles.note__info}>
          <span className={styles.note__category}>
            <i className={styles.circle}></i> {category}
          </span>
          <span className={styles.author}>
            <img
              src={`${user.avatarUrl.url}`}
              alt=""
              className={styles.author__avatar}
            />
            <span className={styles.author__name}>{user.fullName}</span>
          </span>
        </span>
        <h2 className={styles.note__title} title={title}>
          {title}
        </h2>
        <p className={styles.note__text}>{text}</p>

        <div className={styles.note__bottom}>
          <Link to={`/tests/${_id}`} className={styles.note__link}>
            Пройти тест
          </Link>
          <div className={styles.note__reaction}>
            <div className={styles.note__reactionBlock}>
              <LikeIcon className={styles.note__likeIcon} />
              <span className={styles.note__reactionLike}>999</span>
            </div>
            <div className={styles.note__reactionBlock}>
              <DisLikeIcon className={styles.note__disIcon} />
              <span className={styles.note__reactionDisLike}>999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
