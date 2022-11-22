import { useState } from "react";
import { Link } from "react-router-dom";
import { AnswerBlock } from "../../components/AnswerBlock";
import { InfoPanel } from "../../components/InfoPanel";
import { ShowScore } from "../../components/ShowScore";
import { AnswersProps, TestProps } from "../../propTypes";
import styles from "./FullTest.module.scss";

interface FullTestProps {}

export const FullTest = ({}: FullTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<AnswersProps>({
    answer: "",
    correct: false,
  });
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const testObj: TestProps[] = [
    {
      id: 1,
      title: "Video zone: The giant chocolate chip cookie – 1",
      text: "Choose the correct option to complete the sentences.",
      category: "Тесты",
      backgroundImage:
        "https://media.tenor.com/A_fe9hvgrY8AAAAC/chainsaw-man-power.gif",
      viewsCount: 1000,
      ques: [
        {
          title: "Nadiya is going to cook the cookie in _____.",
          answers: [
            {
              answer: "the oven",
              correct: false,
            },
            {
              answer: "the microwave",
              correct: true,
            },
            {
              answer: "a frying pan",
              correct: false,
            },
          ],
        },
        {
          title:
            "The egg, vanilla extract and almond extract are _____ ingredients.",
          answers: [
            {
              answer: "wet",
              correct: false,
            },
            {
              answer: "dry",
              correct: true,
            },
            {
              answer: "mixed",
              correct: false,
            },
          ],
        },
      ],
      user: {
        fullName: "Emil",
        avatarUrl: {
          url: "https://i.gifer.com/origin/6a/6aafe99617311e701baf720627980a98_w200.gif",
        },
      },
    },
  ];

  const handlerAnswerNextClick = () => {
    if (currentAnswer.correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < testObj[0].ques.length) {
      console.log(true);
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlerSetAnswer = (item: AnswersProps) => {
    setCurrentAnswer({ ...item });
  };

  const handlerAnswerPrevClick = () => setCurrentQuestion(currentQuestion - 1);

  console.log(testObj[0].ques[currentQuestion]);
  console.log(currentAnswer);
  console.log(score);

  return (
    <main className={styles.fullTest} data-testid="FullTest">
      {/* <img
          src={testObj[0].backgroundImage}
          className={styles.fullTest__bgIcon}
          alt=""
        /> */}
      <div className={styles.fullTest__content}>
        <h1 className={styles.fullTest__title}>{testObj[0].title}</h1>
        <InfoPanel {...testObj[0]} />
        {/* <div className={styles.fullTest__text}>{testObj[0].text}</div> */}
        {showScore ? (
          <ShowScore score={score} />
        ) : (
          <>
            <div className={styles.questions}>
              <div className={styles.questions__title}>
                <span>{currentQuestion + 1}.</span>{" "}
                {testObj[0].ques[currentQuestion].title}
              </div>
              <div className={styles.answers}>
                {testObj[0].ques[currentQuestion].answers.map((item, index) => (
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
                className={
                  currentQuestion <= 0
                    ? styles.fullTest__buttonHide
                    : styles.fullTest__button
                }
                onClick={handlerAnswerPrevClick}
              >
                Вернуться
              </div>
              <div
                className={styles.fullTest__button}
                onClick={handlerAnswerNextClick}
              >
                Далее
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
