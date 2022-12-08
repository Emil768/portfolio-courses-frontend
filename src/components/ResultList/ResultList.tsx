import { useAppSelector } from "@redux/hooks";
import { testResult } from "@utils";
import styles from "./ResultList.module.scss";

export const ResultList = () => {
  const { quiz, score } = useAppSelector((state) => state.quiz);

  const totalResult = testResult(quiz!);
  const resultEmoji = score === totalResult ? "👏" : " 🤞";

  return (
    <div className={styles.score__result}>
      <h2 className={styles.score__resultTitle}>Результат {resultEmoji}</h2>
      <div className={styles.score__lists}>
        <ul className={styles.score__resultList}>
          <li className={styles.score__resultItem}>Показатель</li>
          <li className={styles.score__resultItem}>
            Количество баллов (правильных ответов)
          </li>
          <li className={styles.score__resultItem}>
            Максимально возможное количество баллов
          </li>
        </ul>
        <ul className={styles.score__resultList}>
          <li className={styles.score__resultItem}>Значение</li>
          <li className={styles.score__resultItem}>{score}</li>
          <li className={styles.score__resultItem}>{totalResult}</li>
        </ul>
      </div>
    </div>
  );
};
