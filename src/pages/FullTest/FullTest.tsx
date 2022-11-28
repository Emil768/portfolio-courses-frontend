import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnswerBlock } from "../../components/AnswerBlock";
import { InfoPanel } from "../../components/InfoPanel";
import { ShowScore } from "../../components/ShowScore";
import { AnswersProps, TestProps } from "../../propTypes";
import { ClipLoader } from "react-spinners";
import styles from "./FullTest.module.scss";

import { ReactComponent as RemoveIcon } from "../../img/remove.svg";
import { ReactComponent as EditIcon } from "../../img/edit.svg";

import axios from "../../axios";
import { useAppSelector } from "../../redux/hooks";

interface FullTestProps {}

export const FullTest = ({}: FullTestProps) => {
  const [testData, setTestData] = useState<TestProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<AnswersProps>({
    answer: "",
    correct: false,
  });
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const { data } = useAppSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/tests/${id}`).then((res) => {
      setTestData(res.data);
      setIsLoading(false);
    });
  }, []);

  const isEditable = data && data._id === testData?.user._id;

  const handlerAnswerNextClick = () => {
    if (currentAnswer.correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < testData!.ques!.length) {
      console.log(true);
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlerSetAnswer = (item: AnswersProps) => {
    setCurrentAnswer({ ...item });
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
            <h1 className={styles.fullTest__title}>{testData?.title}</h1>
            {isEditable ? (
              <div className={styles.fullTest__editable}>
                <EditIcon width={20} />
                <RemoveIcon width={20} />
              </div>
            ) : null}
            <InfoPanel {...testData!} />
            {/* <div className={styles.fullTest__text}>{testObj[0].text}</div> */}
            {showScore ? (
              <ShowScore score={score} />
            ) : (
              <>
                <div className={styles.questions}>
                  <div className={styles.questions__title}>
                    <span>{currentQuestion + 1}.</span>{" "}
                    {testData?.ques[currentQuestion].title}
                  </div>
                  <div className={styles.answers}>
                    {testData?.ques[currentQuestion].answers.map(
                      (item, index) => (
                        <AnswerBlock
                          {...item}
                          key={index}
                          id={index}
                          setAnswers={handlerSetAnswer}
                        />
                      )
                    )}
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
