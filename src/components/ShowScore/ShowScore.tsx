import styles from "./ShowScore.module.scss";

import { useState } from "react";
import { useAppSelector } from "@redux/hooks";

import { ResultList, ProgressProvider, ScoreBlock } from "@components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ShowScoreProps {}

export const ShowScore = () => {
  const { score, quiz } = useAppSelector((state) => state.quiz);

  const resultScore = Math.round((score / quiz!.ques.length) * 100);
  const testResult = quiz!.ques.reduce(
    (acc, { answers }) => acc + answers.filter(({ correct }) => correct).length,
    0
  );

  const hightResult = score === testResult ? "👏" : " 🤞";

  return (
    <div className={styles.score}>
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
