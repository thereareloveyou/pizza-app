import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { register } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const dispatch = useDispatch<AppDispath>();
  const navigate = useNavigate();
  const { jwt } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(register({ email: email.value, password: password.value, name: name.value }));
  };

  return (
    <div className={styles["login-form"]}>
      <Title>Регистрация</Title>
      {<div className={styles["error"]}></div>}
      <form onSubmit={submit} className={styles["form"]}>
        <div className={styles["email-input"]}>
          <label htmlFor="email">Ваш email</label>
          <Input type="text" name="email" placeholder="Email"></Input>
        </div>
        <div className={styles["password-input"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input type="password" name="password" placeholder="Пароль"></Input>
        </div>
        <div className={styles["name-input"]}>
          <label htmlFor="name">Ваше имя</label>
          <Input type="text" name="name" placeholder="Имя"></Input>
        </div>
        <Button className={styles["btn-submit"]} appearance="big">
          Регистрация
        </Button>
        <div className={styles["registration"]}>
          Есть аккаунт?
          <br />
          <Link to="/auth/login">Войти</Link>
        </div>
      </form>
    </div>
  );
}
