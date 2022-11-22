import { Link } from "react-router-dom";
import { Test } from "../../components/Test";
import { TestProps } from "../../propTypes";
import styles from "./Tests.module.scss";

import { ReactComponent as ArrowDownIcon } from "../../img/arrow-down.svg";
import { Popup } from "../../components/Popup";
import { useState } from "react";

interface TestsProps {}

export const Tests = ({}: TestsProps) => {
  const [activePopup, setActivePopup] = useState(false);

  const testObj: TestProps[] = [
    {
      id: 1,
      title: "Video zone: The giant chocolate chip cookie – 1",
      text: "Choose the correct option to complete the sentences.",
      category: "Тесты",
      backgroundImage:
        "https://media.tenor.com/A_fe9hvgrY8AAAAC/chainsaw-man-power.gif",
      viewsCount: 0,
      ques: [
        {
          title: "Video zone: The giant chocolate chip cookie – 1",
          answers: [
            {
              answer: "dasda",
              correct: false,
            },
            {
              answer: "dasda",
              correct: true,
            },
            {
              answer: "dasda",
              correct: false,
            },
          ],
        },
      ],
      user: {
        fullName: "Emil",
        avatarUrl: {
          url: "https://i.gifer.com/origin/6a/6aafe99617311e701baf720627980a98_w200.gif",
        },
      },
    },
    {
      id: 2,
      title: "Video zone: The giant chocolate chip cookie – 1",
      text: "Choose the correct option to complete the sentences.",
      category: "Тесты",
      backgroundImage:
        "https://64.media.tumblr.com/50ca8821ecaa6a5b428046257cbbae48/57155c6195c10f27-7b/s540x810/6562f12bdedc8fbd693f884c4cc091fb45bc41e3.gif",
      viewsCount: 0,
      ques: [
        {
          title: "Video zone: The giant chocolate chip cookie – 1",
          answers: [
            {
              answer: "dasda",
              correct: false,
            },
            {
              answer: "dasda",
              correct: true,
            },
            {
              answer: "dasda",
              correct: false,
            },
          ],
        },
      ],
      user: {
        fullName: "Emil",
        avatarUrl: {
          url: "https://i.gifer.com/origin/6a/6aafe99617311e701baf720627980a98_w200.gif",
        },
      },
    },
  ];
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
          <Popup active={activePopup} />
        </div>
      </div>
      <div className={styles.notes__content}>
        {testObj.map((item) => (
          <Test {...item} key={item.id} />
        ))}
      </div>
    </main>
  );
};
