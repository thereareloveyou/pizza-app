import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const getUserData = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles["login-form"]}>
      <Title>Вход</Title>
      {loginErrorMessage && <div className={styles["error"]}>{loginErrorMessage}</div>}
      <form onSubmit={getUserData} className={styles["form"]}>
        <div className={styles["email-input"]}>
          <label htmlFor="email">Ваш email</label>
          <Input type="text" name="email" placeholder="Email"></Input>
        </div>
        <div className={styles["password-input"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input type="password" name="password" placeholder="Пароль"></Input>
        </div>
        <Button className={styles["btn-submit"]} appearance="big">
          Вход
        </Button>
        <div className={styles["registration"]}>
          Нет аккаунта?
          <br />
          <Link to="/auth/register">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
}
