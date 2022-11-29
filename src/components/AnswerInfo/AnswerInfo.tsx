import { useState, useMemo, useEffect } from "react";
import styles from "./AnswerInfo.module.scss";
import { ReactComponent as RemoveIcon } from "../../img/close.svg";
import ReactSwitch from "react-switch";
import { AnswersProps, AvatarProps } from "../../propTypes";

interface AnswerInfoProps extends AnswersProps {
  id: number;
  getAnswer: (index: number, { answer, correct }: AnswersProps) => void;
  removeAnswer: (indexAnswer: number) => void;
}

export const AnswerInfo = ({
  id,
  answer,
  getAnswer,
  removeAnswer,
}: AnswerInfoProps) => {
  const [answerTitle, setAnswerTitle] = useState("");
  const [switchTrue, setSwithTrue] = useState(false);

  console.log({ answerTitle, switchTrue });

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
        defaultValue={answer}
        required
      />
      <ReactSwitch onChange={setSwithTrue} checked={switchTrue} />
      <RemoveIcon
        width={40}
        className={styles.addNote__remove}
        onClick={() => removeAnswer(id)}
      />
    </div>
  );
};
