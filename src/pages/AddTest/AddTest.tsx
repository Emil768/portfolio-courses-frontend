import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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

  const { id } = useParams();
  const navigate = useNavigate();

  const isEditable = Boolean(id);

  useEffect(() => {
    if (id) {
      axios.get(`/tests/${id}`).then(({ data }) => {
        setTitleQues(data.title);
        setTextQues(data.text);
        setCategory(data.category);
        setBgImage(data.backgroundImage);
        setQuestions(data.ques);
      });
    }
  }, []);

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

  const handlerRemoveAnswer = (indexQues: number, indexAnswer: number) => {
    const nextState: QuesProps[] = questions.map((item: QuesProps, i) => {
      if (i == indexQues) {
        if (item.answers.length !== 1) {
          item.answers.splice(indexAnswer, 1);
          return {
            title: item.title,
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
      const { data } = isEditable
        ? await axios.patch(`/tests/${id}`, fields)
        : await axios.post("/tests", fields);

      const _id = isEditable ? id : data._id;

      navigate(`/tests/${_id}`);
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
          defaultValue={titleQues}
          required
        />

        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Категория"
          onChange={(e) => setCategory(e.target.value)}
          defaultValue={category}
          required
        />
        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Ссылка на превью"
          onChange={(e) => setBgImage(e.target.value)}
          defaultValue={bgImage}
          required
        />

        <textarea
          className={styles.addNote__text}
          placeholder="Краткое описание"
          name="message"
          cols={30}
          rows={4}
          required
          onChange={(e) => setTextQues(e.target.value)}
          defaultValue={textQues}
        ></textarea>

        <div className={styles.addNote__tests}>
          {questions.map((item, index) => {
            return (
              <div className={styles.addNote__questionBlock} key={index}>
                <QuestionBlock
                  {...item}
                  id={index}
                  getQuesData={handlerGetAnswers}
                  removeQuesData={handlerRemoveAnswer}
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
          <div className={styles.addNote__confirm} onClick={handlerAddQuestion}>
            {/* {isEditable ? "Сохранить" : "Опубликовать"} */}
            Добавить вопрос
          </div>
          <button className={styles.addNote__confirm} type="submit">
            {isEditable ? "Сохранить" : "Опубликовать"}
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
