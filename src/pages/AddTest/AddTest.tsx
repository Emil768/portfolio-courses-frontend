import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./AddTest.module.scss";

import { ReactComponent as PlusIcon } from "../../img/plus.svg";
import { AnswersProps, QuesProps } from "../../propTypes";
import { AnswerInfo } from "../../components/AnswerInfo";
import { useAppSelector } from "../../redux/hooks";
import { QuestionBlock } from "../../components/QuestionBlock";

import axios from "../../axios";

interface AddTestProps {}

export const AddTest = ({}: AddTestProps) => {
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const [titleQues, setTitleQues] = useState("");
  const [category, setCategory] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [textQues, setTextQues] = useState("");
  const [questions, setQuestions] = useState<QuesProps[]>([
    {
      title: "",
      answers: [
        { answer: "", correct: false },
        { answer: "", correct: false },
        { answer: "", correct: false },
      ],
    },
  ]);

  const navigate = useNavigate();

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

  const handlerAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { title: "", answers: [{ answer: "", correct: false }] },
    ]);
  };

  const handlerGetAnswers = (
    indexQues: number,
    titleAnswer: string,
    indexAnswer: number,
    { answer, correct }: AnswersProps
  ) => {
    const nextState: QuesProps[] = questions.map((item: QuesProps, i) => {
      if (i == indexQues) {
        if (item.answers[indexAnswer]) {
          const newAnswerObj: AnswersProps = { answer, correct };
          item.answers[indexAnswer] = newAnswerObj;
          return {
            title: titleAnswer,
            answers: [...item.answers],
          };
        }
      }
      return item;
    });

    setQuestions(nextState);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = {
      title: titleQues,
      text: textQues,
      category,
      backgroundImage: bgImage,
      ques: questions,
    };

    try {
      const { data } = await axios.post("/tests", fields);

      navigate(`/tests/${data._id}`);
    } catch (err) {
      alert("Не удалось создать тест");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className={styles.addNote} onSubmit={onSubmit}>
      <div className={styles.addNote__content}>
        <input
          type="text"
          className={styles.addNote__title}
          placeholder="Название"
          onChange={(e) => setTitleQues(e.target.value)}
        />

        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Категория"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Ссылка на превью"
          onChange={(e) => setBgImage(e.target.value)}
        />

        <textarea
          className={styles.addNote__text}
          placeholder="Краткое описание"
          name="message"
          cols={30}
          rows={4}
          required
          onChange={(e) => setTextQues(e.target.value)}
        ></textarea>

        <div className={styles.addNote__tests}>
          {questions.map((item, index) => {
            return (
              <div className={styles.addNote__questionBlock} key={index}>
                <QuestionBlock
                  {...item}
                  id={index}
                  getQuesData={handlerGetAnswers}
                />
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
          <button className={styles.addNote__confirm} type="submit">
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
