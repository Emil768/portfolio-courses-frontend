import { UserProps } from "../../propTypes";
import styles from "./UserInfo.module.scss";
import { ReactComponent as DateIcon } from "../../img/date.svg";
import { ReactComponent as ChartIcon } from "../../img/chart.svg";
import { ReactComponent as EmailIcon } from "../../img/email.svg";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import axios from "../../axios";

interface UserInfoProps {}

export const UserInfo = ({}: UserInfoProps) => {
  const [user, setUser] = useState<UserProps>();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/auth/me/${id}`).then((res) => setUser(res.data));
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
            {user?.createdAt}
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
