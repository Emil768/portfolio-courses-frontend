import { useState, useMemo, useEffect } from "react";
import styles from "./AnswerInfo.module.scss";
import { ReactComponent as RemoveIcon } from "../../img/close.svg";
import ReactSwitch from "react-switch";
import { AnswersProps, AvatarProps } from "../../propTypes";

interface AnswerInfoProps extends AnswersProps {
  id: number;
  getAnswer: (index: number, { answer, correct }: AnswersProps) => void;
}

export const AnswerInfo = ({ id, getAnswer }: AnswerInfoProps) => {
  const [answerTitle, setAnswerTitle] = useState("");
  const [switchTrue, setSwithTrue] = useState(false);

  useEffect(() => {
    getAnswer(id, { answer: answerTitle, correct: switchTrue });
  }, [answerTitle, switchTrue]);

  return (
    <div className={styles.addNote__answers}>
      <input
        type="text"
        className={styles.addNote__questionsAnswer}
        placeholder="Введите ответ"
        onChange={(e) => setAnswerTitle(e.target.value)}
      />
      <ReactSwitch onChange={setSwithTrue} checked={switchTrue} />
      <RemoveIcon width={40} />
    </div>
  );
};
