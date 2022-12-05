import styles from "./ResultList.module.scss";
interface ResultListProps {
  score: number;
  fullScore: number;
  resultEmoji: string;
}

export const ResultList = ({
  score,
  fullScore,
  resultEmoji,
}: ResultListProps) => {
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
          <li className={styles.score__resultItem}>{fullScore}</li>
        </ul>
      </div>
    </div>
  );
};
