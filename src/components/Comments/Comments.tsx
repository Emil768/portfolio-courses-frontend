import { useState, useEffect } from "react";
import { ReplyIcon } from "@images";
import axios from "@axios";
import styles from "./Comments.module.scss";

import { TestProps } from "@proptypes";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchAddComment, fetchTest, getAllComments } from "@redux/slices";

interface CommentsProps extends TestProps {}

export const Comments = ({ _id, comments }: CommentsProps) => {
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

  return (
    <div className={styles.comments} data-testid="Comments">
      <div className={styles.comments__title}>
        Все комментарии{" "}
        <span className={styles.comments__length}>{comments?.length}</span>
      </div>
      <div className={styles.comments__content}>
        {comments?.map((item, index) => (
          <div className={styles.comments__block} key={index}>
            <div className={styles.comments__avatar}>
              <img src={item.postedBy?.avatarUrl.url} alt="avatar" />
            </div>
            <div className={styles.comments__info}>
              <div className={styles.comments__infoTop}>
                <div className={styles.comments__name}>
                  {item.postedBy?.fullName}
                </div>
                <div className={styles.comments__date}>
                  {item.postedBy?.createdAt}
                </div>
              </div>
              <div className={styles.comments__text}>{item.text}</div>
              <div className={styles.comments__communication}></div>
              <div className={styles.comments__reply}>
                <ReplyIcon width={15} />
                Ответить
              </div>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
};
