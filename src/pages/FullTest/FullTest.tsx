import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AnswerBlock, InfoPanel, ShowScore } from "@components";

import { CurrentAnswerProps } from "@proptypes";
import { ClipLoader } from "react-spinners";
import styles from "./FullTest.module.scss";

import { RemoveIcon, EditIcon } from "@images";

import axios from "@axios";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchTest, setAnswerQuestion, setShowScore } from "@redux/slices";

interface FullTestProps {}

export const FullTest = ({}: FullTestProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);
  const { quiz, status, currentQuesIndex, showScore, score } = useAppSelector(
    (state) => state.quiz
  );

  const [currentAnswer, setCurrentAnswer] = useState({
    id: 0,
    answer: "",
    correct: false,
  });

  const isLoading = Boolean(status === "loading");
  const isEditable = data && data._id === quiz?.user._id;

  useEffect(() => {
    dispatch(fetchTest(id!));
  }, [id]);

  const onRemoveTest = async () => {
    if (window.confirm("Вы действительно хотите удалить тест?")) {
      await axios.delete(`/tests/${id}`);
      navigate("/");
    }
  };

  const getCurrentAnswer = ({ id, answer, correct }: CurrentAnswerProps) =>
    setCurrentAnswer({ id, answer, correct });

  const handlerNextQuiestion = () => {
    if (currentAnswer.answer !== "") {
      const nextQuestion = currentQuesIndex + 1;

      if (nextQuestion < quiz!.ques.length) {
        dispatch(setAnswerQuestion(currentAnswer));
      } else {
        dispatch(setShowScore());
      }
    }
  };

  return (
    <main className={styles.fullTest} data-testid="FullTest">
      {/* <img
          src={testObj[0].backgroundImage}
          className={styles.fullTest__bgIcon}
          alt=""
        /> */}
      <div className={styles.fullTest__content}>
        {isLoading ? (
          <ClipLoader
            loading={isLoading}
            color="#39ca81"
            className={styles.spinner}
          />
        ) : (
          <>
            <h1 className={styles.fullTest__title}>{quiz!.title}</h1>
            {isEditable ? (
              <div className={styles.fullTest__editable}>
                <Link to={`/edit/${id}`}>
                  <EditIcon width={20} />
                </Link>
                <RemoveIcon width={20} onClick={onRemoveTest} />
              </div>
            ) : null}
            <InfoPanel />
            {showScore ? (
              <ShowScore />
            ) : (
              <>
                <div className={styles.questions}>
                  <div className={styles.questions__image}>
                    <img
                      src="https://www.looper.com/img/gallery/20-most-powerful-attack-on-titan-characters-ranked/intro-1647387047.jpg"
                      alt=""
                    />
                  </div>
                  <div className={styles.questions__info}>
                    <div className={styles.questions__title}>
                      <span>{currentQuesIndex + 1}.</span> {quiz!.title}
                    </div>
                    <div className={styles.answers}>
                      {quiz!.ques[currentQuesIndex].answers.map(
                        (item, index) => (
                          <AnswerBlock
                            {...item}
                            id={index}
                            key={index}
                            setAnswer={getCurrentAnswer}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.questions__buttons}>
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
    </main>
  );
};
