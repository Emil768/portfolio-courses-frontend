import { options } from "@internals";
import { TestProps, UserProps } from "@proptypes";
import { Link } from "react-router-dom";
import styles from "./TestSwitch.module.scss";

interface TestSwitchProps {
  user: UserProps;
  data: TestProps[];
}

export const TestSwitch = ({ user, data }: TestSwitchProps) => (
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
            {user.fullName} прошел(-а) тест
            <Link to={`/tests/${item._id}`}>
              <b> «{item.title}».</b>
            </Link>
            на <b>20%</b>
            <span className={styles.user__date}>
              {new Date(item.createdAt).toLocaleDateString("ru-RU", options)}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.user__empty}>
        {user.fullName} пока не прошел ни один тест
      </div>
    )}
  </>
);
