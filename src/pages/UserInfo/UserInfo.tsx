import { UserProps } from "@proptypes";
import styles from "./UserInfo.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { DateIcon, ChartIcon, EmailIcon } from "@images";

import axios from "@axios";
import { options } from "@internals";

export const UserInfo = () => {
  const [user, setUser] = useState<UserProps>();

  const { id } = useParams();

  const date = new Date(user?.createdAt!);

  useEffect(() => {
    axios.get(`/auth/me/${id}`).then((res: any) => setUser(res.data));
  }, [id]);

  return (
    <div className={styles.user} data-testid="UserInfo">
      <div className={styles.user__content}>
        <div className={styles.user__avatar}>
          <img src={user?.avatarUrl.url} alt="avatar icon" />
          <h3 className={styles.user__name}>@{user?.fullName}</h3>
          <div className={styles.user__email}>
            <EmailIcon width={16} />
            {user?.email}
          </div>
          <div className={styles.user__date}>
            <DateIcon width={16} />
            {date.toLocaleDateString("ru-RU", options)}
          </div>
        </div>
        <div className={styles.user__statistics}>
          <div className={styles.user__title}>
            Статистика
            <ChartIcon width={16} />
          </div>
          <div>
            <div className={styles.user__history}>
              Прошел тест
              <Link className={styles.user__testTitle} to={"/tests/2"}>
                Video zone: The giant chocolate chip cookie – 1
              </Link>
              на <b>20%</b>
            </div>
            <div className={styles.user__history}>
              Понравился тест
              <Link className={styles.user__testTitle} to={"/tests/2"}>
                Video zone: The giant chocolate chip cookie – 1
              </Link>
            </div>
            <div className={styles.user__history}>
              Не понравился тест
              <Link className={styles.user__testTitle} to={"/tests/2"}>
                Video zone: The giant chocolate chip cookie – 1
              </Link>
            </div>
            <div className={styles.user__history}>
              Прокомментировал тест
              <Link className={styles.user__testTitle} to={"/tests/2"}>
                Video zone: The giant chocolate chip cookie – 1
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
