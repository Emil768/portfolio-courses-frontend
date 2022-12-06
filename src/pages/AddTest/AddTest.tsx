import { useState, createContext, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./AddTest.module.scss";

import { PlusIcon } from "@images";
import {
  AddTestContextType,
  AnswersProps,
  MainAddTestProps,
  QuesProps,
} from "@proptypes";

import { useAppSelector } from "@redux/hooks";
import {
  QuestionBlock,
  AnswerBlock,
  AddTestMain,
  AddTestQuestion,
} from "@components";

import axios from "@axios";

export const TestContext = createContext<AddTestContextType | null>(null);

interface AddTestProps {}

export const AddTest = ({}: AddTestProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditable = Boolean(id);
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const [isToggleNav, setIsToggleNav] = useState(false);

  const [data, setData] = useState({
    title: "",
    category: "",
    bgImage: "",
    text: "",
    questions: [
      {
        title: "",
        answers: [
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
        ],
      },
    ],
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);

  // useEffect(() => {
  //   if (id) {
  //     axios.get(`/tests/${id}`).then(({ data }) => {
  //       setData({
  //         titleQues: data.title,
  //         textQues: data.text,
  //         category: data.category,
  //         bgImage: data.backgroundImage,
  //         questions: data.ques,
  //       });
  //     });
  //   }
  // }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = {
      title: data.title,
      text: data.text,
      category: data.category,
      backgroundImage: data.bgImage,
      ques: data.questions,
    };

    try {
      const { data } = isEditable
        ? await axios.patch(`/tests/${id}`, fields)
        : await axios.post("/tests", fields);

      const _id = isEditable ? id : data._id;

      navigate(`/tests/${_id}`);
    } catch (err) {
      alert("Не удалось создать тест");
    }
  };

  const handlerAddQuestion = () => {
    setData({
      ...data,
      questions: [
        ...data.questions,
        { title: "", answers: [{ answer: "", correct: false }] },
      ],
    });
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlerNextQuestion = () => {
    if (currentQuestion !== data.questions.length)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handlerPrevQuestion = () => {
    if (currentQuestion !== 1) setCurrentQuestion(currentQuestion - 1);
  };

  const handlerAddAnswer = (index: number) => {
    const nextState = data.questions.map((item, i) => {
      if (i == index) {
        return {
          title: item.title,
          answers: [...item.answers, { answer: "", correct: false }],
        };
      } else {
        return item;
      }
    });

    setData({ ...data, questions: nextState });
  };

  const handlerGetAnswers = (
    id: number,
    title: string,
    idAnswer: number,
    { answer, correct }: AnswersProps
  ) => {
    const nextState = data.questions.map((item, index) => {
      if (index == id) {
        if (item.answers[idAnswer]) {
          item.answers[idAnswer] = { answer, correct };
          return {
            title: title,
            answers: [...item.answers],
          };
        }
      }
      return item;
    });

    setData({ ...data, questions: nextState });
  };

  const handlerRemoveAnswer = (id: number, idAnswer: number) => {
    const nextState = data.questions.map((item, index) => {
      if (index == id) {
        if (item.answers.length !== 1) {
          item.answers.splice(idAnswer, 1);
          return {
            title: item.title,
            answers: [...item.answers],
          };
        }
      }

      return item;
    });

    setData({ ...data, questions: nextState });
  };

  const onGetMainProps = ({
    title,
    text,
    category,
    bgImage,
  }: MainAddTestProps) =>
    setData({
      title,
      text,
      category,
      bgImage,
      questions: [...data.questions],
    });

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/"} />;
  }
  console.log(data);
  return (
    <form className={styles.addNote} onSubmit={onSubmit}>
      <div className={styles.addNote__content}>
        <div className={styles.addNote__top}>
          <ul className={styles.addNote__list}>
            <li
              className={
                isToggleNav
                  ? [styles.addNote__item, styles.addNote__itemActive].join(" ")
                  : styles.addNote__item
              }
              onClick={() => setIsToggleNav(true)}
            >
              Основное
            </li>
            <li
              className={
                isToggleNav
                  ? styles.addNote__item
                  : [styles.addNote__item, styles.addNote__itemActive].join(" ")
              }
              onClick={() => setIsToggleNav(false)}
            >
              Вопросы
            </li>
          </ul>
        </div>

        <TestContext.Provider
          value={{
            data,
            currentQuestion,
            onGetMainProps,
            handlerAddAnswer,
            handlerGetAnswers,
            handlerRemoveAnswer,
            handlerNextQuestion,
            handlerPrevQuestion,
          }}
        >
          {isToggleNav ? <AddTestMain /> : <AddTestQuestion />}
        </TestContext.Provider>

        <div className={styles.addNote__buttons}>
          <button className={styles.addNote__confirm} type="submit">
            {isEditable ? "Сохранить" : "Опубликовать"}
          </button>
          {!isToggleNav ? (
            <button
              type="button"
              className={styles.addNote__confirm}
              onClick={handlerAddQuestion}
            >
              Добавить вопрос
            </button>
          ) : null}
          <Link
            to={isEditable ? `/tests/${id}` : "/"}
            className={styles.addNote__cancel}
          >
            Отмена
          </Link>
        </div>
      </div>
    </form>
  );
};
