import { Link } from "react-router-dom";
import { Test } from "../../components/Test";
import styles from "./Tests.module.scss";

import { Popup } from "../../components/Popup";
import axios from "../../axios";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTests } from "../../redux/slices/tests/tests";
import { ClipLoader } from "react-spinners";
import { PopupItems } from "../../propTypes/popupProps";

interface TestsProps {}

export const Tests = ({}: TestsProps) => {
  const [activePopup, setActivePopup] = useState(false);

  const dispatch = useAppDispatch();
  const { tests, status } = useAppSelector((state) => state.tests);

  const isTestsLoading = status === "loading";
  const isTestsError = status === "error";

  const sortNames: PopupItems[] = [
    { name: "Дате добавления", link: "date" },
    { name: "По лайкам", link: "like" },
    { name: "По дизлайкам", link: "dislike" },
  ];

  useEffect(() => {
    dispatch(fetchTests());
  }, []);

  return (
    <main className={styles.notes}>
      <div className={styles.notes__top}>
        <div className={styles.notes__categories}>
          <Link to={`/category/${"test"}`} className={styles.notes__link}>
            Тесты
          </Link>
          <Link to={`/category/${"words"}`} className={styles.notes__link}>
            Подстановка слов
          </Link>
        </div>
        <div className={styles.notes__sorted}>
          Сортировка по:{" "}
          <span
            onClick={() => setActivePopup(!activePopup)}
            className={styles.notes__pick}
          >
            {" "}
            по лайкам
          </span>
          <Popup active={activePopup} items={sortNames} />
        </div>
      </div>
      <div
        className={
          isTestsLoading
            ? [styles.notes__content, styles.notes__contentLoading].join(" ")
            : styles.notes__content
        }
      >
        {!isTestsError ? (
          (isTestsLoading ? [...Array(1)] : tests).map((item, index) =>
            isTestsLoading ? (
              <ClipLoader
                loading={isTestsLoading}
                color="#39ca81"
                key={index}
              />
            ) : (
              <Test {...item} key={item._id} />
            )
          )
        ) : (
          <div>Error</div>
        )}
      </div>
    </main>
  );
};
