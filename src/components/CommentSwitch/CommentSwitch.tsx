import { options } from "@internals";
import { TestProps, UserProps } from "@proptypes";
import { Link } from "react-router-dom";
import styles from "./CommentSwitch.module.scss";

interface CommentSwitchProps {
  user: UserProps;
  data: TestProps[];
}

export const CommentSwitch = ({ user, data }: CommentSwitchProps) => (
  <>
    {data.length ? (
      data.map((item) => (
        <div className={styles.user__infoBlock} key={item._id}>
          <img
            className={styles.user__infoImage}
            src={user.avatarUrl.url}
            alt="avatar"
          />
          <div className={styles.user__infoText}>
            {user.fullName} прокоментировал(-а) тест{" "}
            <Link to={`/tests/${item._id}`}>
              <b>«{item.title}»</b>
            </Link>{" "}
            автора
            <Link to={`/user/${item.user._id}`}>
              <b> {item.user.fullName}</b>
            </Link>
            <span className={styles.user__date}>
              {new Date(item.comments[0].createdAt).toLocaleDateString(
                "ru-RU",
                options
              )}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.user__empty}>
        {user.fullName} пока не прокомментировал(а) ни одной публикации.
      </div>
    )}
  </>
);
