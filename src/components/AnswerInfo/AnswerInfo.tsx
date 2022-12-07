import { useState, useMemo, useEffect, useContext } from "react";
import styles from "./AnswerInfo.module.scss";
import ReactSwitch from "react-switch";
import { CloseIcon } from "@images";
import { AddTestContextType, AnswersProps, AvatarProps } from "@proptypes";
import { TestContext } from "@pages";

interface AnswerInfoProps extends AnswersProps {
  id: number;
  idQuestion: number;
}

export const AnswerInfo = ({ id, idQuestion }: AnswerInfoProps) => {
  const { data, onGetMainProps } = useContext(
    TestContext
  ) as AddTestContextType;

  const currentAnswer = data.questions[idQuestion].answers[id];

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = data.questions.map((item, index) => {
      if (index == idQuestion) {
        if (item.answers[id]) {
          item.answers[id] = {
            answer: e.target.value,
            correct: item.answers[id].correct,
          };
          return {
            title: item.title,
            answers: [...item.answers],
          };
        }
      }
      return item;
    });

    onGetMainProps({ ...data, questions: nextState });
  };

  const onChangeCorrect = () => {
    const nextState = data.questions.map((item, index) => {
      if (index == idQuestion) {
        if (item.answers[id]) {
          item.answers[id] = {
            answer: item.answers[id].answer,
            correct: !item.answers[id].correct,
          };
          return {
            title: item.title,
            answers: [...item.answers],
          };
        }
      }
      return item;
    });

    onGetMainProps({ ...data, questions: nextState });
  };

  const onRemoveAnswer = () => {
    const nextState = data.questions.map((item, index) => {
      if (index == idQuestion) {
        if (item.answers.length !== 1) {
          item.answers.splice(id, 1);
          return {
            title: item.title,
            answers: [...item.answers],
          };
        }
      }

      return item;
    });

    onGetMainProps({ ...data, questions: nextState });
  };

  return (
    <div className={styles.addNote__answers}>
      <input
        type="text"
        className={styles.addNote__questionsAnswer}
        placeholder="Введите ответ"
        onChange={onChangeAnswer}
        defaultValue={currentAnswer.answer}
        required
      />
      <ReactSwitch onChange={onChangeCorrect} checked={currentAnswer.correct} />
      <CloseIcon
        width={40}
        className={styles.addNote__remove}
        onClick={onRemoveAnswer}
      />
    </div>
  );
};
