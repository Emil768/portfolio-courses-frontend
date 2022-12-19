import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./FullTest.module.scss";

import { AnswerBlock, InfoPanel, ShowScore, Comments } from "@components";
import { ClipLoader } from "react-spinners";
import { RemoveIcon, EditIcon } from "@images";

import axios from "@axios";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchTest, setAnswerQuestion, setShowScore } from "@redux/slices";

export const FullTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);
  const { quiz, status, currentQuesIndex, showScore, score } = useAppSelector(
    (state) => state.quiz
  );

  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  const checkQuiz = Object.keys(quiz).length !== 0;
  const isCurrentAnswer = currentAnswer !== null;
  const currentQuestion = checkQuiz && quiz.ques[currentQuesIndex];

  const isLoading = Boolean(status === "loading");
  const isEditable = data?._id === quiz.user?._id;

  useEffect(() => {
    dispatch(fetchTest(id!));
  }, [id]);

  const onRemoveTest = async () => {
    if (window.confirm("Вы действительно хотите удалить тест?")) {
      await axios.delete(`/tests/${id}`);
      navigate("/");
    }
  };

  const getCurrentAnswer = (index: number) => {
    setCurrentAnswer(index);
  };

  const handlerNextQuiestion = () => {
    if (isCurrentAnswer) {
      const nextQuestion = currentQuesIndex + 1;
      if (nextQuestion <= quiz.ques.length) {
        dispatch(setAnswerQuestion(currentAnswer));
        setCurrentAnswer(null);
        if (nextQuestion === quiz.ques.length) {
          dispatch(setShowScore());
        }
      }
    }
  };

  return (
    <main className={styles.fullTest} data-testid="FullTest">
      <div className={styles.fullTest__content}>
        {isLoading ? (
          <ClipLoader
            loading={isLoading}
            color="#39ca81"
            className={styles.spinner}
          />
        ) : (
          <>
            <h1 className={styles.fullTest__title}>{quiz.title}</h1>
            {isEditable && (
              <div className={styles.fullTest__editable}>
                <Link to={`/edit/${id}`}>
                  <EditIcon width={20} />
                </Link>
                <RemoveIcon width={20} onClick={onRemoveTest} />
              </div>
            )}
            <InfoPanel {...quiz} />
            {showScore ? (
              <ShowScore {...quiz} totalScore={score} />
            ) : (
              <>
                <div className={styles.questions}>
                  {currentQuestion && currentQuestion.imageURL?.url ? (
                    <div className={styles.questions__image}>
                      <img src={currentQuestion.imageURL?.url} alt="" />
                    </div>
                  ) : null}
                  <div
                    className={
                      currentQuestion && currentQuestion.imageURL?.url
                        ? styles.questions__info
                        : styles.questions__infoFull
                    }
                  >
                    <div className={styles.questions__title}>
                      <span>{currentQuesIndex + 1}.</span>{" "}
                      {currentQuestion && currentQuestion.title}
                    </div>
                    <div className={styles.answers}>
                      {currentQuestion &&
                        currentQuestion.answers.map((item, index) => (
                          <AnswerBlock
                            {...item}
                            key={item._id}
                            keyIndex={index}
                            setAnswer={getCurrentAnswer}
                          />
                        ))}
                    </div>
                  </div>
                </div>

                <div className={styles.questions__buttons}>
                  {/* <div
                    className={
                      currentQuesIndex !== 0
                        ? styles.fullTest__button
                        : styles.fullTest__buttonHide
                    }
                    onClick={handlerPrevQuestion}
                  >
                    Вернуться
                  </div> */}
                  <div
                    className={styles.fullTest__button}
                    onClick={handlerNextQuiestion}
                  >
                    Далее
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Comments {...quiz} />
    </main>
  );
};
