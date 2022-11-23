import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { ReactComponent as EmailIcon } from "../../img/email.svg";
import { ReactComponent as PasswordIcon } from "../../img/folder.svg";

interface LoginProps {}

export const Login = ({}: LoginProps) => (
  <div className={styles.login} data-testid="Login">
    <form action="" className={styles.form}>
      <div className={styles.form__content}>
        <h2 className={styles.form__title}>Авторизация</h2>
        <div className={styles.form__inputs}>
          <div className={styles.form__input}>
            <input type="email" placeholder="Введите логин (e-mail)" />
            <EmailIcon className={styles.form__email} />
          </div>
          <div className={styles.form__input}>
            <input type="password" placeholder="Введите пароль" />
            <PasswordIcon className={styles.form__password} />
          </div>
        </div>
        <div className={styles.form__buttons}>
          <button>Войти</button>
          <Link to={"/auth/register"}>Зарегистрироваться</Link>
        </div>
      </div>
    </form>
  </div>
);
