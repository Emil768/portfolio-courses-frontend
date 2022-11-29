import { useState } from "react";
import { PopupItems } from "../../propTypes/popupProps";
import { Popup } from "../Popup";
import { ReactComponent as ArrowDownIcon } from "../../img/arrow-down.svg";
import styles from "./UserPanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/auth/auth";
import axios from "axios";

interface UserPanelProps {}

export const UserPanel = ({}: UserPanelProps) => {
  const [userState, setUserState] = useState(false);
  const dispath = useAppDispatch();

  const { data } = useAppSelector((state) => state.auth);

  const userSettings: PopupItems[] = [
    {
      name: "Профиль",
      link: `/user/${data?._id}`,
    },
    {
      name: "Добавить тест",
      link: "/add-test",
    },
    {
      name: "Выйти",
      onClickPopup() {
        dispath(logout());
        if (window.confirm("Вы действительно хотите выйти?")) {
          window.localStorage.removeItem("token");
        }
      },
    },
  ];

  return (
    <div className={styles.user__panel} data-testid="UserPanel">
      <div className={styles.author} onClick={() => setUserState(!userState)}>
        <img
          src={data?.avatarUrl.url}
          alt=""
          className={styles.author__avatar}
        />
        <ArrowDownIcon className={styles.user__panelArrow} width={10} />
      </div>
      <Popup active={userState} items={userSettings} />
    </div>
  );
};
