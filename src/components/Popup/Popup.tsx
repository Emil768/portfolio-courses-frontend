import { PopupProps } from "../../propTypes/popupProps";
import styles from "./Popup.module.scss";

export const Popup = ({ active, items }: PopupProps) => (
  <div
    className={
      active ? [styles.popup, styles.popup__active].join(" ") : styles.popup
    }
    data-testid="Popup"
  >
    <ul className={styles.popup__List}>
      {items.map((item, index) => (
        <li
          className={styles.popup__item}
          key={index}
          onClick={item.onClickPopup && item.onClickPopup}
        >
          {item.name}
        </li>
      ))}
    </ul>
  </div>
);
