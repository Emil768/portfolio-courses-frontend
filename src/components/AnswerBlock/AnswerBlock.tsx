import { AnswersProps, CurrentAnswerProps } from "@proptypes";
import styles from "./AnswerBlock.module.scss";

interface AnswerBlockProps extends AnswersProps {
  setAnswer: (index: number) => void;
  currentIndex: number | null;
  id: number;
}

export const AnswerBlock = ({
  answer,
  id,
  setAnswer,
  currentIndex,
}: AnswerBlockProps) => {
  const checkTest = () => setAnswer(id);

  return (
    <div className={styles.answers__block}>
      <input
        type="radio"
        name="answer"
        id={`q${id}-option`}
        onChange={checkTest}
        key={id}
        checked={currentIndex === id ? true : false}
      />
      <label htmlFor={`q${id}-option`}>{answer}</label>
    </div>
  );
};
