import { CrownIcon } from "@images";
import axios from "@axios";
import { useEffect, useState } from "react";
import styles from "./TopResults.module.scss";
import { Link, useParams } from "react-router-dom";
import { ScoreProps } from "@proptypes";

interface TopResultsProps {}

export const TopResults = ({}: TopResultsProps) => {
  const { id } = useParams();
  const [dataScore, setDataScore] = useState<ScoreProps[]>([]);
  useEffect(() => {
    axios
      .get(`/getTopScore/${id}`)
      .then(({ data }: { data: ScoreProps[] }) => setDataScore(data));
  }, []);

  return (
    <div className={styles.topResults} data-testid="TopResults">
      {dataScore.length ? (
        <div className={styles.topResults__content}>
          <h3 className={styles.topResults__title}>Топ прохождений🔥</h3>
          <div className={styles.topResulst__chart}>
            {dataScore.slice(-3).map((item) => (
              <ul className={styles.topResults__list} key={item._id}>
                <li className={styles.topResults__item}>
                  <div className={styles.topResults__user}>
                    <img src={item.scoreBy.avatarUrl.url} alt="avatar" />
                    <Link
                      className={styles.topResults__link}
                      to={`/user/${item.scoreBy._id}`}
                    >
                      {item.scoreBy.fullName}
                    </Link>
                  </div>
                  <span className={styles.topResults__score}>
                    {item.totalScore} %
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
