import { AnswersProps } from "../../propTypes";
import styles from "./AnswerBlock.module.scss";

interface AnswerBlockProps extends AnswersProps {
  setAnswers: (item: AnswersProps) => void;
  id: number;
}

export const AnswerBlock = ({
  answer,
  correct,
  id,
  setAnswers,
}: AnswerBlockProps) => (
  <div
    className={styles.answers__block}
    onClick={() => setAnswers({ answer, correct })}
  >
    <input type="radio" name="answer" id={`${id}`} />
    <label htmlFor={`${id}`}>{answer}</label>
  </div>
);
