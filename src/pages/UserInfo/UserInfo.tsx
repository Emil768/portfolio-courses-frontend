import { SwithProps, UserProps } from "@proptypes";
import styles from "./UserInfo.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { DateIcon, ChartIcon, EmailIcon } from "@images";

import axios from "@axios";
import { options } from "@internals";
import {
  CommentSwitch,
  LikesSwitch,
  PublishSwitch,
  TestSwitch,
} from "@components";

export const UserInfo = () => {
  const [user, setUser] = useState<UserProps>();
  const [activeSwitch, setActiveSwitch] = useState<SwithProps>({
    title: "Прохождение тестов",
    type: "tests",
    component: <TestSwitch />,
  });

  const { id } = useParams();

  const date = new Date(user?.createdAt!);

  useEffect(() => {
    axios.get(`/auth/me/${id}`).then(({ data }: any) => setUser(data));
  }, [id]);

  console.log(user);

  const switchData = [
    {
      title: "Прохождение тестов",
      type: "tests",
      component: <TestSwitch />,
    },
    {
      title: "Публикации",
      type: "tests",
      component: <PublishSwitch />,
    },
    {
      title: "Лайки",
      type: "tests",
      component: <LikesSwitch />,
    },
    {
      title: "Комментарии",
      type: "tests",
      component: <CommentSwitch />,
    },
  ];

  console.log(activeSwitch);
  return (
    <div className={styles.user} data-testid="UserInfo">
      <div className={styles.user__content}>
        <div className={styles.user__avatar}>
          <img src={user?.avatarUrl.url} alt="avatar icon" />
          <div className={styles.user__contact}>
            <div className={styles.user__email}>
              <EmailIcon width={16} />
              {user?.email}
            </div>
            <h2 className={styles.user__name}>@{user?.fullName}</h2>
            <div className={styles.user__date}>
              <DateIcon width={16} />
              {date.toLocaleDateString("ru-RU", options)}
            </div>
          </div>
        </div>

        <div className={styles.user__statistics}>
          <div className={styles.user__categories}>
            {switchData.map((item, index) => (
              <>
                <div
                  className={styles.user__category}
                  onClick={() =>
                    setActiveSwitch({
                      title: item.title,
                      type: item.type,
                      component: item.component,
                    })
                  }
                  key={index}
                >
                  {item.title}
                </div>
                {/* <item.component/> */}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
