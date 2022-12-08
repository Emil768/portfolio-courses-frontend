import { useContext } from "react";

import { AddTestContextType, QuesProps } from "@proptypes";
import { AnswerInfo } from "@components";

import { TestContext } from "@pages";

import styles from "./QuestionBlock.module.scss";
import { RemoveIcon } from "@images";

interface QuestionBlockProps extends QuesProps {
  id: number;
}

export const QuestionBlock = ({ id, answers }: QuestionBlockProps) => {
  const { data, currentQuestion, setCurrentQuestion, onGetMainProps } =
    useContext(TestContext) as AddTestContextType;

  const currentQuestionTitle = data.questions[id].title;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGetMainProps({
      ...data,
      questions: data.questions.map((item, index) =>
        index === id
          ? { title: e.target.value, answers: [...item.answers] }
          : item
      ),
    });
  };

  const onRemoveCurrentQuestion = () => {
    const nextState = data.questions.filter((item, index) => {
      if (id !== 0) {
        setCurrentQuestion(currentQuestion - 1);
        return index !== id;
      }
      return item;
    });

    onGetMainProps({
      ...data,
      questions: nextState,
    });
  };

  return (
    <div className={styles.addNote__questions}>
      <div className={styles.addNote__questionTitle}>
        Вопрос #{id + 1}
        <RemoveIcon width={25} onClick={onRemoveCurrentQuestion} />
      </div>
      <input
        type="text"
        className={styles.addNote__questionsTitle}
        placeholder="Введите название вопроса"
        onChange={onChangeTitle}
        defaultValue={currentQuestionTitle}
        required
      />

      <input
        type="text"
        className={styles.addNote__questionsTitle}
        placeholder="Изображение"
      />

      {answers.map((item, index) => (
        <AnswerInfo {...item} id={index} key={index} idQuestion={id} />
      ))}
    </div>
  );
};
