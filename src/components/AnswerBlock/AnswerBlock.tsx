import { AnswersProps, CurrentAnswerProps } from "@proptypes";
import styles from "./AnswerBlock.module.scss";

interface AnswerBlockProps extends AnswersProps {
  setAnswer: ({ id, answer, correct }: CurrentAnswerProps) => void;
  id: number;
}

export const AnswerBlock = ({
  answer,
  correct,
  id,
  setAnswer,
}: AnswerBlockProps) => (
  <div className={styles.answers__block}>
    <input type="radio" name="answer" id={`${id}`} key={id} />
    <label htmlFor={`${id}`} onClick={() => setAnswer({ id, answer, correct })}>
      {answer}
    </label>
  </div>
);
