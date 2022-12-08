import styles from "./ShowScore.module.scss";

import { useAppSelector } from "@redux/hooks";

import { ResultList, ProgressProvider, ScoreBlock } from "@components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ShowScore = () => {
  const { score, quiz } = useAppSelector((state) => state.quiz);
  const resultScore = Math.round((score / quiz!.ques.length) * 100);

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
        <ResultList />
      </div>
      {quiz!.ques.map((item, index) => (
        <ScoreBlock {...item} key={index} id={index} />
      ))}
    </div>
  );
};
