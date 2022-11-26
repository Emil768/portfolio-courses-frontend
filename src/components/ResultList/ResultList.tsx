import styles from "./ResultList.module.scss";
import { ReactComponent as ResultIcon } from "../../img/result.svg";
interface ResultListProps {}

export const ResultList = ({}: ResultListProps) => (
  <div className={styles.score__result}>
    <h2 className={styles.score__resultTitle}>
      Результат <ResultIcon />
    </h2>
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
        <li className={styles.score__resultItem}>0</li>
        <li className={styles.score__resultItem}>0</li>
      </ul>
    </div>
  </div>
);
