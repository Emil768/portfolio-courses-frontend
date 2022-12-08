import { useParams } from "react-router-dom";
import styles from "./Tests.module.scss";

import { Test, Popup, Categories } from "@components";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchCategory, fetchTests } from "@redux/slices";
import { ClipLoader } from "react-spinners";
import { sortNames } from "@internals";

export const Tests = () => {
  const [activePopup, setActivePopup] = useState(false);
  const { tests, status } = useAppSelector((state) => state.tests);

  const { title } = useParams();

  const dispatch = useAppDispatch();

  const isTestsLoading = status === "loading";
  const isTestsError = status === "error";

  useEffect(() => {
    if (title) {
      dispatch(fetchCategory(title));
    } else {
      dispatch(fetchTests());
    }
  }, [title]);

  return (
    <main className={styles.notes}>
      <div className={styles.notes__top}>
        <Categories />
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
