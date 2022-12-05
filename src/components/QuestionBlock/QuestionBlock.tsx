import { useState, useContext, useMemo, useEffect } from "react";

import { AddTestContextType, AnswersProps, QuesProps } from "@proptypes";
import { AnswerInfo } from "@components";

import { TestContext } from "@pages";

import styles from "./QuestionBlock.module.scss";

interface QuestionBlockProps extends QuesProps {
  id: number;
}

export const QuestionBlock = ({ id, title, answers }: QuestionBlockProps) => {
  const [titleAnswer, setTitleAnswer] = useState("");
  const { handlerGetAnswers, handlerRemoveAnswer } = useContext(
    TestContext
  ) as AddTestContextType;

  const onGetAnswer = (idAnswer: number, { answer, correct }: AnswersProps) => {
    handlerGetAnswers(id, titleAnswer, idAnswer, { answer, correct });
  };

  const onRemoveAnswer = (idAnswer: number) =>
    handlerRemoveAnswer(id, idAnswer);

  return (
    <div className={styles.addNote__questions}>
      <input
        type="text"
        className={styles.addNote__questionsTitle}
        placeholder="Введите название вопроса"
        onChange={(e) => setTitleAnswer(e.target.value)}
        required
      />

      <input
        type="file"
        className={styles.addNote__questionsTitle}
        placeholder="Изображение"
        required
      />

      {answers.map((item, index) => (
        <AnswerInfo
          {...item}
          id={index}
          key={index}
          onGetAnswer={onGetAnswer}
          onRemoveAnswer={onRemoveAnswer}
        />
      ))}
    </div>
  );
};
