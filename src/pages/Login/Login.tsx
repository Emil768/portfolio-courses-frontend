import { Link, Navigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { ReactComponent as EmailIcon } from "../../img/email.svg";
import { ReactComponent as PasswordIcon } from "../../img/folder.svg";

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAuth } from "../../redux/slices/auth/auth";
import { LoginProps } from "../../propTypes/authProps";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@massl.ru",
      password: "123123",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginProps) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return window.alert("Пользователь не найден!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token!);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.login} data-testid="Login">
      <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__content}>
          <h2 className={styles.form__title}>Авторизация</h2>
          <div className={styles.form__inputs}>
            <div className={styles.form__input}>
              <input
                type="email"
                placeholder="Введите логин (e-mail)"
                {...register("email", { required: "Укажите e-mail" })}
              />
              <EmailIcon className={styles.form__email} />
            </div>
            <div className={styles.form__input}>
              <input
                type="password"
                placeholder="Введите пароль"
                {...register("password", { required: "Укажите пароль" })}
              />
              <PasswordIcon className={styles.form__password} />
            </div>
          </div>
          <div className={styles.form__buttons}>
            <button type="submit">Войти</button>
            <Link to={"/auth/register"}>Зарегистрироваться</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
