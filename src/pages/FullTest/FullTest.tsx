import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnswerBlock } from "../../components/AnswerBlock";
import { InfoPanel } from "../../components/InfoPanel";
import { ShowScore } from "../../components/ShowScore";
import { AnswersProps, TestProps } from "../../propTypes";
import { ClipLoader } from "react-spinners";
import styles from "./FullTest.module.scss";

import { ReactComponent as RemoveIcon } from "../../img/remove.svg";
import { ReactComponent as EditIcon } from "../../img/edit.svg";

import axios from "../../axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTest } from "../../redux/slices/tests/tests";

interface FullTestProps {}

export const FullTest = ({}: FullTestProps) => {
  const [testData, setTestData] = useState<TestProps>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<AnswersProps>({
    answer: "",
    correct: false,
  });
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const { data } = useAppSelector((state) => state.auth);
  const { quiz, status } = useAppSelector((state) => state.tests);
  const { id } = useParams();

  const isLoading = Boolean(status === "loading");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTest(id!));
  }, [id]);

  const isEditable = data && data._id === testData?.user._id;

  const handlerAnswerNextClick = () => {
    if (currentAnswer.correct) {
      setScore(score + 1);
    }

    if (currentAnswer.answer !== "") {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < testData!.ques!.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }
  };

  const handlerSetAnswer = (item: AnswersProps) => {
    setCurrentAnswer({ ...item });
  };

  const onRemoveTest = async () => {
    if (window.confirm("Вы действительно хотите удалить тест?")) {
      await axios.delete(`/tests/${id}`);
      navigate("/");
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
            <h1 className={styles.fullTest__title}>{quiz?.title}</h1>
            {isEditable ? (
              <div className={styles.fullTest__editable}>
                <Link to={`/edit/${id}`}>
                  <EditIcon width={20} />
                </Link>
                <RemoveIcon width={20} onClick={onRemoveTest} />
              </div>
            ) : null}
            <InfoPanel {...quiz!} />
            {/* <div className={styles.fullTest__text}>{testObj[0].text}</div> */}
            {showScore ? (
              <ShowScore score={score} dataTest={testData!} />
            ) : (
              <>
                <div className={styles.questions}>
                  <div className={styles.questions__title}>
                    <span>{currentQuestion + 1}.</span> {quiz?.title}
                  </div>
                  <div className={styles.answers}>
                    {quiz?.ques[currentQuestion].answers.map((item, index) => (
                      <AnswerBlock
                        {...item}
                        key={index}
                        id={index}
                        setAnswers={handlerSetAnswer}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.questions__buttons}>
                  <div
                    className={styles.fullTest__button}
                    onClick={handlerAnswerNextClick}
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
