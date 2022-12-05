import { Link, NavLink, useParams } from "react-router-dom";
import styles from "./Tests.module.scss";

import { Test, Popup } from "@components";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchCategory, fetchTests } from "@redux/slices";
import { ClipLoader } from "react-spinners";
import { PopupItems } from "@proptypes";

interface TestsProps {}

export const Tests = ({}: TestsProps) => {
  const [activePopup, setActivePopup] = useState(false);

  const { title } = useParams();

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
    if (title) {
      dispatch(fetchCategory(title));
    }

    dispatch(fetchTests());
  }, [title]);

  const getCategory = (title: string) => dispatch(fetchCategory(title));

  return (
    <main className={styles.notes}>
      <div className={styles.notes__top}>
        <div className={styles.notes__categories}>
          <span
            className={styles.notes__link}
            onClick={() => getCategory("Тесты")}
          >
            Тесты
          </span>
          {/* <span className={styles.notes__link}>Подставновка слов</span> */}
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
