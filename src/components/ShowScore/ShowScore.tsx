import { TestProps } from "../../propTypes";
import styles from "./ShowScore.module.scss";

import { useState } from "react";
import { ScoreBlock } from "../ScoreBlock";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResultList } from "../ResultList";

interface ShowScoreProps {
  score: number;
}

export const ShowScore = ({ score }: ShowScoreProps) => {
  const testObj: TestProps[] = [
    {
      _id: 1,
      title: "Video zone: The giant chocolate chip cookie – 1",
      text: "Choose the correct option to complete the sentences.",
      category: "Тесты",
      backgroundImage:
        "https://media.tenor.com/A_fe9hvgrY8AAAAC/chainsaw-man-power.gif",
      viewsCount: 1000,
      ques: [
        {
          title: "Nadiya is going to cook the cookie in _____.",
          answers: [
            {
              answer: "the oven",
              correct: false,
            },
            {
              answer: "the microwave",
              correct: true,
            },
            {
              answer: "a frying pan",
              correct: false,
            },
          ],
        },
        {
          title:
            "The egg, vanilla extract and almond extract are _____ ingredients.",
          answers: [
            {
              answer: "wet",
              correct: false,
            },
            {
              answer: "dry",
              correct: true,
            },
            {
              answer: "mixed",
              correct: false,
            },
          ],
        },
      ],
      user: {
        fullName: "Emil",
        avatarUrl: {
          public_id: "asdas",
          url: "https://i.gifer.com/origin/6a/6aafe99617311e701baf720627980a98_w200.gif",
        },
      },
    },
  ];

  const resultScore = (score / testObj[0].ques.length) * 100;

  return (
    <div className={styles.score}>
      {/* <span className={styles.score__title}>{score} 👏</span> */}

      <div className={styles.score__statistics}>
        <div className={styles.score__progressbar}>
          <CircularProgressbar value={resultScore} text={`${resultScore}%`} />
        </div>
        <ResultList />
      </div>
      {testObj[0].ques.map((item, index) => {
        return <ScoreBlock {...item} key={index} id={index} />;
      })}
    </div>
  );
};
