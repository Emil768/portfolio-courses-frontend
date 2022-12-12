import { useState } from "react";

import styles from "./Comments.module.scss";

import { CommentProps, TestProps, UserProps } from "@proptypes";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchAddComment, fetchRemoveComment } from "@redux/slices";
import { CommentsBlock } from "@components";

interface CommentsProps extends TestProps {}

export const Comments = ({ _id, comments }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);
  const [text, setText] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = {
      testId: _id,
      text,
    };

    dispatch(fetchAddComment(comment));
    setText("");
  };

  const handlerOnReplyComment = (name: string) => {
    setText(`@${name},`);
  };

  const commentsCompleted = comments ? comments : [];

  return (
    <div className={styles.comments} data-testid="Comments">
      <div className={styles.comments__title}>
        Все комментарии
        <span className={styles.comments__length}>
          {commentsCompleted.length}
        </span>
      </div>

      <div className={styles.comments__content}>
        {commentsCompleted.map((item) => (
          <CommentsBlock
            {...item}
            key={item._id}
            testId={_id}
            onReplyComment={handlerOnReplyComment}
          />
        ))}
      </div>

      {data ? (
        <form className={styles.comments__form} onSubmit={onSubmit}>
          <textarea
            className={styles.comments__field}
            onChange={(e) => setText(e.target.value)}
            placeholder="Комментарий..."
            name="comment"
            cols={30}
            rows={2}
            value={text}
            required
          ></textarea>
          <div className={styles.comments__buttons}>
            {/* <button className={styles.comments__button}>Отмена</button> */}
            <button className={styles.comments__button} type="submit">
              Добавить
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.comments__warning}>
          Не забудьте <Link to={"/auth/login"}> войти</Link> или{" "}
          <Link to={"/auth/register"}>зарегистрироваться</Link> чтобы писать
          комментарии
        </div>
      )}
    </div>
  );
};
