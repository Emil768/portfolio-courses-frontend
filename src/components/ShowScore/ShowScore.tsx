import { TestProps } from "../../propTypes";
import styles from "./ShowScore.module.scss";

import { useState } from "react";
import { ScoreBlock } from "../ScoreBlock";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResultList } from "../ResultList";
import { ProgressProvider } from "../ProgressProvider";
import { useAppSelector } from "../../redux/hooks";

interface ShowScoreProps {}

export const ShowScore = () => {
  const { score, quiz } = useAppSelector((state) => state.quiz);

  const resultScore = (score / quiz!.ques.length) * 100;
  const testResult = quiz!.ques.reduce(
    (acc, { answers }) => acc + answers.filter(({ correct }) => correct).length,
    0
  );

  const hightResult = score === testResult ? "👏" : " 🤞";

  return (
    <div className={styles.score}>
      {/* <span className={styles.score__title}>{score} 👏</span> */}

      <div className={styles.score__statistics}>
        <div className={styles.score__progressbar}>
          <ProgressProvider valueStart={0} valueEnd={resultScore}>
            {(value: number) => (
              <CircularProgressbar value={value} text={`${resultScore}%`} />
            )}
          </ProgressProvider>
        </div>
        <ResultList
          score={score}
          fullScore={testResult}
          resultEmoji={hightResult}
        />
      </div>
      {quiz!.ques.map((item, index) => (
        <ScoreBlock {...item} key={index} id={index} />
      ))}
    </div>
  );
};
