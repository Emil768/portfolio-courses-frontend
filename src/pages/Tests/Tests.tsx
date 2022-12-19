import { useParams } from "react-router-dom";
import styles from "./Tests.module.scss";

import { Test, Categories, SortPopup } from "@components";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchCategory, fetchTests } from "@redux/slices";
import { ClipLoader } from "react-spinners";

export const Tests = () => {
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
        <SortPopup />
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
