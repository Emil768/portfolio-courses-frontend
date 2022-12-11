import { useState } from "react";
import { EditIcon, RemoveIcon, ReplyIcon } from "@images";
import styles from "./Comments.module.scss";

import { CommentProps, TestProps, UserProps } from "@proptypes";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchAddComment, fetchRemoveComment } from "@redux/slices";

interface CommentsProps extends TestProps {
  auth: UserProps;
}

export const Comments = ({ _id, comments, auth }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = {
      testId: _id,
      text,
    };

    dispatch(fetchAddComment(comment));
  };

  const handlerOnRemoveComment = async (item: CommentProps) => {
    dispatch(fetchRemoveComment({ id: item._id, testId: _id }));
  };

  const commentsCompleted = comments ? comments : [];

  return (
    <div className={styles.comments} data-testid="Comments">
      <div className={styles.comments__title}>
        Все комментарии{" "}
        <span className={styles.comments__length}>
          {commentsCompleted.length}
        </span>
      </div>

      <div className={styles.comments__content}>
        {commentsCompleted.map((item, index) => (
          <div className={styles.comments__block} key={index}>
            <div className={styles.comments__avatar}>
              <img src={item.postedBy.avatarUrl.url} alt="avatar" />
            </div>
            <div className={styles.comments__info}>
              <div className={styles.comments__infoTop}>
                <div className={styles.comments__name}>
                  <Link to={`/user/${item.postedBy._id}`}>
                    {item.postedBy.fullName}
                  </Link>
                </div>
                <div className={styles.comments__date}>
                  {item.postedBy.createdAt}
                </div>
              </div>
              <div className={styles.comments__text}>{item.text}</div>
              <div className={styles.comments__communication}></div>
              <div className={styles.comments__reply}>
                <ReplyIcon width={15} />
                Ответить
              </div>
            </div>

            {item.postedBy._id === (auth && auth._id) && (
              <div className={styles.comments__panel}>
                <div className={styles.comments__edit}>
                  <EditIcon width={20} />
                </div>
                <div
                  className={styles.comments__remove}
                  onClick={() => handlerOnRemoveComment(item)}
                >
                  <RemoveIcon width={20} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {auth ? (
        <form className={styles.comments__form} onSubmit={onSubmit}>
          <textarea
            className={styles.comments__field}
            onChange={(e) => setText(e.target.value)}
            placeholder="Комментарий..."
            name="comment"
            cols={30}
            rows={2}
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
