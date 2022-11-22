import styles from "./Popup.module.scss";

interface PopupProps {
  active: boolean;
}

export const Popup = ({ active }: PopupProps) => (
  <div
    className={
      active ? [styles.popup, styles.popup__active].join(" ") : styles.popup
    }
    data-testid="Popup"
  >
    <ul className={styles.popup__List}>
      <li className={styles.popup__item}>Дате добавления</li>
      <li className={styles.popup__item}>По лайкам</li>
      <li className={styles.popup__item}>По дизлайкам</li>
    </ul>
  </div>
);
