import { useState } from "react";
import styles from "./AnswerInfo.module.scss";
import { ReactComponent as RemoveIcon } from "../../img/close.svg";
import ReactSwitch from "react-switch";
import { AnswersProps } from "../../propTypes";

interface AnswerInfoProps extends AnswersProps {
  id: number;
  onToggle: (index: number, correct: boolean) => void;
  onRemove: (index: number) => void;
}

export const AnswerInfo = ({
  correct,
  onToggle,
  onRemove,
  id,
}: AnswerInfoProps) => {
  const [switchTrue, setSwithTrue] = useState(false);

  const onSwitchTrue = () => {
    onToggle(id, !switchTrue);
    setSwithTrue(!switchTrue);
  };

  const onRemoveItem = () => {
    onRemove(id);
  };

  return (
    <div className={styles.addNote__answers}>
      <input
        type="text"
        className={styles.addNote__questionsAnswer}
        placeholder="Введите ответ"
      />
      <ReactSwitch onChange={onSwitchTrue} checked={switchTrue} />
      <RemoveIcon width={50} onClick={onRemoveItem} />
    </div>
  );
};
