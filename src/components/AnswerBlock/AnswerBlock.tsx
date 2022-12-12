import { AnswerBlockProps } from "@proptypes";
import styles from "./AnswerBlock.module.scss";

export const AnswerBlock = ({
  answer,
  _id,
  setAnswer,
  keyIndex,
}: AnswerBlockProps) => {
  const checkTest = () => setAnswer(keyIndex);

  return (
    <div className={styles.answers__block}>
      <input
        type="radio"
        name="answer"
        id={`q${_id}-option`}
        onChange={checkTest}
        key={_id}
      />
      <label htmlFor={`q${_id}-option`}>{answer}</label>
    </div>
  );
};
