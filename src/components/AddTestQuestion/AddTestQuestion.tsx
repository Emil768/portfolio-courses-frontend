import { useState, createContext, useContext } from "react";
import { AddTestContextType, AnswersProps, QuesProps } from "@proptypes";
import { QuestionBlock } from "@components";
import styles from "./AddTestQuestion.module.scss";

import { ArrowIcon, CloseIcon, RemoveIcon } from "@images";
import { TestContext } from "@pages";

interface AddTestQuestionProps {}

export const AddTestQuestion = ({}: AddTestQuestionProps) => {
  const { data, onGetMainProps, setCurrentQuestion, currentQuestion } =
    useContext(TestContext) as AddTestContextType;

  const handlerNextQuestion = () =>
    currentQuestion !== data.questions.length
      ? setCurrentQuestion(currentQuestion + 1)
      : null;

  const handlerPrevQuestion = () =>
    currentQuestion !== 1 ? setCurrentQuestion(currentQuestion - 1) : null;

  const handlerAddAnswer = (id: number) => {
    onGetMainProps({
      ...data,
      questions: data.questions.map((item, index) =>
        index === id
          ? {
              title: item.title,
              answers: [...item.answers, { answer: "", correct: false }],
            }
          : item
      ),
    });
  };

  return (
    <div className={styles.addNote__tests} data-testid="AddTestQuestion">
      <div
        className={[styles.addNote__arrow, styles.addNote__left].join(" ")}
        onClick={handlerPrevQuestion}
      >
        <ArrowIcon />
      </div>
      {data.questions.map((item, index) => {
        return (
          <div
            className={
              currentQuestion === index + 1
                ? styles.addNote__questionActive
                : styles.addNote__questionBlock
            }
            key={index}
          >
            <QuestionBlock {...item} id={index} />
            <span
              className={styles.addNote__answersAdd}
              onClick={() => handlerAddAnswer(index)}
            >
              Добавить ответ
            </span>
          </div>
        );
      })}
      <div
        className={[styles.addNote__arrow, styles.addNote__right].join(" ")}
        onClick={handlerNextQuestion}
      >
        <ArrowIcon />
      </div>
    </div>
  );
};
