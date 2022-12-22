import { useContext, useRef } from "react";

import { AddTestContextType, QuesLessProps } from "@proptypes";
import { AnswerInfo } from "@components";

import { TestContext } from "@pages";

import styles from "./QuestionBlock.module.scss";
import { RemoveIcon } from "@images";

import axios from "@axios";

interface QuestionBlockProps extends QuesLessProps {
  id: number;
}

export const QuestionBlock = ({ id, answers }: QuestionBlockProps) => {
  const { data, currentQuestion, setCurrentQuestion, onGetMainProps } =
    useContext(TestContext) as AddTestContextType;

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const currentQuestionTitle = data.questions[id].title;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGetMainProps({
      ...data,
      questions: data.questions.map((item, index) =>
        index === id
          ? {
              title: e.target.value,
              imageURL: item.imageURL,
              answers: [...item.answers],
            }
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

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files;
      const formData = new FormData();
      formData.append("picture", file![0]);

      const newAvatarUrl = await axios.post("/uploads", formData);
      const { secure_url, public_id } = newAvatarUrl.data;

      onGetMainProps({
        ...data,
        questions: data.questions.map((item, index) =>
          index === id
            ? {
                title: item.title,
                imageURL: { public_id, url: secure_url },
                answers: [...item.answers],
              }
            : item
        ),
      });
    } catch (err) {
      console.log(err);
      window.alert("Не удалось загрузить картинку");
    }
  };

  const onClickInput = () => {
    inputFileRef.current!.click();
  };

  return (
    <div className={styles.addNote__questions}>
      <div className={styles.addNote__questionTitle}>
        Вопрос #{id + 1}
        <RemoveIcon width={25} onClick={onRemoveCurrentQuestion} />
      </div>
      <input
        type="text"
        name="title"
        className={styles.addNote__questionsTitle}
        placeholder="Введите название вопроса"
        onChange={onChangeTitle}
        defaultValue={currentQuestionTitle}
        required
      />

      <div className={styles.addNote__imageBlock}>
        <button
          className={styles.addNote__button}
          type="button"
          onClick={onClickInput}
        >
          Выберите изображение
        </button>
        <input
          type="file"
          name="picture"
          hidden
          ref={inputFileRef}
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={onUploadImage}
          className={styles.addNote__questionsTitle}
          placeholder="Изображение"
        />

        {data.questions[id].imageURL?.url && (
          <img
            className={styles.addNote__image}
            src={`${data.questions[id].imageURL?.url}`}
            alt=""
          />
        )}
      </div>

      {answers.map((item, index) => (
        <AnswerInfo {...item} id={index} key={index} idQuestion={id} />
      ))}
    </div>
  );
};
