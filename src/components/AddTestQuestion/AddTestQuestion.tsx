import { useState, createContext, useContext } from "react";
import { AddTestContextType, AnswersProps, QuesProps } from "@proptypes";
import { QuestionBlock } from "@components";
import styles from "./AddTestQuestion.module.scss";

import { CloseIcon } from "@images";
import { TestContext } from "@pages";

interface AddTestQuestionProps {}

export const AddTestQuestion = ({}: AddTestQuestionProps) => {
  const { data, handlerAddAnswer } = useContext(
    TestContext
  ) as AddTestContextType;

  return (
    <div className={styles.AddTestQuestion} data-testid="AddTestQuestion">
      <div className={styles.addNote__tests}>
        {data.questions.map((item, index) => {
          return (
            <div className={styles.addNote__questionBlock} key={index}>
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

        <div className={styles.addNote__questionBlock}>
          <div className={styles.addNote__questionAdd}>Добавить вопрос</div>
          {/* {data.questions.map((item, index) => (
            <div className={styles.addNote__question} key={index}>
              <div className={styles.addNote__questionTop}>
                <b>Test Question #{index + 1}</b> <CloseIcon width={30} />
              </div>
              <div className={styles.addNote__questionTitle}>{item.title}</div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
