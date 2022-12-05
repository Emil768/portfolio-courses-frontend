import { useState, useMemo, useEffect } from "react";
import styles from "./AnswerInfo.module.scss";
import ReactSwitch from "react-switch";
import { CloseIcon } from "@images";
import { AnswersProps, AvatarProps } from "@proptypes";

interface AnswerInfoProps extends AnswersProps {
  id: number;
  onGetAnswer: (idAnswer: number, { answer, correct }: AnswersProps) => void;
  onRemoveAnswer: (idAnswer: number) => void;
}

export const AnswerInfo = ({
  id,
  answer,
  correct,
  onGetAnswer,
  onRemoveAnswer,
}: AnswerInfoProps) => {
  const [answerTitle, setAnswerTitle] = useState("");
  const [switchTrue, setSwithTrue] = useState(false);

  useEffect(() => {
    onGetAnswer(id, { answer: answerTitle, correct: switchTrue });
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
      <CloseIcon
        width={40}
        className={styles.addNote__remove}
        onClick={() => onRemoveAnswer(id)}
      />
    </div>
  );
};
