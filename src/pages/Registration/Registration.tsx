import styles from "./Registration.module.scss";
import { ReactComponent as EmailIcon } from "../../img/email.svg";
import { ReactComponent as PasswordIcon } from "../../img/folder.svg";
import { ReactComponent as UserIcon } from "../../img/user.svg";
import { ReactComponent as ImageIcon } from "../../img/image.svg";

import { Link } from "react-router-dom";

interface RegistrationProps {}

export const Registration = ({}: RegistrationProps) => (
  <div className={styles.registration} data-testid="Login">
    <form action="" className={styles.form}>
      <div className={styles.form__content}>
        <h2 className={styles.form__title}>Регистрация</h2>
        <div className={styles.form__inputs}>
          <div className={styles.form__input}>
            <input type="text" placeholder="Введите ваше имя" />
            <UserIcon className={styles.form__email} />
          </div>
          <div className={styles.form__input}>
            <input type="email" placeholder="Введите логин (e-mail)" />
            <EmailIcon className={styles.form__email} />
          </div>
          <div className={styles.form__input}>
            <input type="password" placeholder="Введите пароль" />
            <PasswordIcon className={styles.form__password} />
          </div>
          <div className={styles.form__input}>
            <input type="file" accept="image/jpeg,image/png,image/gif" />
            <ImageIcon className={styles.form__password} />
          </div>
        </div>
        <div className={styles.form__buttons}>
          <button>Зарегистрироваться</button>
          <Link to={"/auth/login"}> Авторизоваться</Link>
        </div>
      </div>
    </form>
  </div>
);
