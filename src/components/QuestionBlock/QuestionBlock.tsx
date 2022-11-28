import { useState, useMemo, useEffect } from "react";

import { AnswersProps, QuesProps } from "../../propTypes";
import { AnswerInfo } from "../AnswerInfo";
import styles from "./QuestionBlock.module.scss";

interface QuestionBlockProps extends QuesProps {
  id: number;
  getQuesData: (
    indexQues: number,
    titleAnswer: string,
    indexAnswer: number,
    { answer, correct }: AnswersProps
  ) => void;
}

export const QuestionBlock = ({
  id,
  title,
  answers,
  getQuesData,
}: QuestionBlockProps) => {
  const [titleAnswer, setTitleAnswer] = useState("");

  const getAnswer = (index: number, { answer, correct }: AnswersProps) =>
    getQuesData(id, titleAnswer, index, { answer, correct });

  return (
    <div className={styles.addNote__questions}>
      <input
        type="text"
        defaultValue={title}
        className={styles.addNote__questionsTitle}
        placeholder="Введите название вопроса"
        onChange={(e) => setTitleAnswer(e.target.value)}
      />

      {answers.map((item, index) => (
        <AnswerInfo {...item} id={index} key={index} getAnswer={getAnswer} />
      ))}
    </div>
  );
};
