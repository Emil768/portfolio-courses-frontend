import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AddTest.module.scss";

import { ReactComponent as PlusIcon } from "../../img/plus.svg";
import { AnswersProps, QuesProps } from "../../propTypes";
import { AnswerInfo } from "../../components/AnswerInfo";

interface AddTestProps {}

export const AddTest = ({}: AddTestProps) => {
  const [questions, setQuestions] = useState<QuesProps[]>([
    {
      title: "Тестовый текст",
      answers: [
        { answer: "asd", correct: false },
        { answer: "d", correct: false },
        { answer: "asd", correct: false },
      ],
    },
  ]);

  const handlerAddAnswer = (index: number) => {
    const newAnswerObj: AnswersProps = { answer: "", correct: false };
    const nextState = questions.map((item, i) => {
      if (i == index) {
        return {
          title: item.title,
          answers: [...item.answers, newAnswerObj],
        };
      } else {
        return item;
      }
    });

    setQuestions(nextState);
  };

  console.log(questions);

  const handlerAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { title: "", answers: [{ answer: "", correct: false }] },
    ]);
  };

  const handlerToggleAnswer = (id: number, correct: boolean) => {
    console.log(correct);
    setQuestions(
      questions.filter((item) => (item.answers[id].correct = correct))
    );
  };

  const handlerRemoveAnswer = (id: number) => {
    const newState = questions.map((item) => {
      item.answers.filter((asnwer, index) => {
        return index !== id;
      });
      return item;
    });

    setQuestions(newState);
  };

  return (
    <form className={styles.addNote} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.addNote__content}>
        <input
          type="text"
          className={styles.addNote__title}
          placeholder="Название"
          // defaultValue={data && data.title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Категория"
          // defaultValue={data && data.category}
          // onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Ссылка на картинку"
          // defaultValue={data && data.category}
          // onChange={(e) => setCategory(e.target.value)}
        />{" "}
        <div className={styles.addNote__tests}>
          {questions.map((item, index) => {
            return (
              <div className={styles.addNote__questions} key={index}>
                <input
                  type="text"
                  defaultValue={item.title}
                  className={styles.addNote__questionsTitle}
                  placeholder="Введите название вопроса"
                />

                {item.answers.map((item, index) => (
                  <AnswerInfo
                    {...item}
                    id={index}
                    key={index}
                    onToggle={handlerToggleAnswer}
                    onRemove={handlerRemoveAnswer}
                  />
                ))}
                <span
                  className={styles.addNote__answersAdd}
                  onClick={() => handlerAddAnswer(index)}
                >
                  Добавить ответ
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.addNote__buttons}>
          <button
            className={styles.addNote__confirm}
            onClick={handlerAddQuestion}
          >
            {/* {isEditable ? "Сохранить" : "Опубликовать"} */}
            Добавить вопрос
          </button>
          <button className={styles.addNote__confirm}>
            {/* {isEditable ? "Сохранить" : "Опубликовать"} */}
            Опубликовать
          </button>
          {/* <Link
        to={isEditable ? `/notes/${id}` : "/"}
        className={styles.addNote__cancel}
      >
        Отмена
      </Link> */}
        </div>
      </div>
    </form>
  );
};
