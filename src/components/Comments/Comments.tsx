import { ReplyIcon } from "@images";
import styles from "./Comments.module.scss";

interface CommentsProps {}

export const Comments = ({}: CommentsProps) => {
  const comments = [
    {
      avatar: "https://avatarfiles.alphacoders.com/715/71560.jpg",
      name: "EmilkaAdminka228",
      date: "6 июня 2019 в 08:32",
      text: "Если честно, достали эти ваши короли и наталки. Хочется почитать комментарии реальных людей, а не ваших выдуманных троллей.",
    },
    {
      avatar:
        "https://play-lh.googleusercontent.com/6pDX7n9j4q5o09MxivayNyq5eovSpJ7duJ13R6PALDgDKJe0-S0GxwQCs9fNTPpUfOo",
      name: "EmilkaAdminka228",
      date: "6 июня 2019 в 08:32",
      text: "Ожидал увидеть свои комментарии с ошибками. Увы....",
    },
  ];

  return (
    <div className={styles.comments} data-testid="Comments">
      <div className={styles.comments__title}>
        Все комментарии{" "}
        <span className={styles.comments__length}>{comments.length}</span>
      </div>
      <div className={styles.comments__content}>
        {comments.map((item, index) => (
          <div className={styles.comments__block} key={index}>
            <div className={styles.comments__avatar}>
              <img src={item.avatar} alt="avatar" />
            </div>
            <div className={styles.comments__info}>
              <div className={styles.comments__infoTop}>
                <div className={styles.comments__name}>{item.name}</div>
                <div className={styles.comments__date}>{item.date}</div>
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
    </div>
  );
};
