import styles from "./ShowScore.module.scss";

import { useAppSelector } from "@redux/hooks";

import { ResultList, ProgressProvider, ScoreBlock } from "@components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TestProps } from "@proptypes";

interface ShowScoreProps extends TestProps {
  score: number;
}

export const ShowScore = ({ ques, score }: ShowScoreProps) => {
  const resultScore = Math.round((score / ques.length) * 100);

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
      {ques.map((item, index) => (
        <ScoreBlock {...item} key={index} id={index} />
      ))}
    </div>
  );
};
