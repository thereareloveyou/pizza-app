import { Await, Link, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";

import styles from "./Product.module.css";
import Title from "../../components/Title/Title";

import backSvg from "./../../images/arrow-back.svg";
import cartAvg from "./../../images/cart-icon-white.svg";
import starSvg from "./../../images/stars-icon.svg";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export function Product() {
  const data = useLoaderData() as { data: Product };

  const dispatch = useDispatch<AppDispath>();
  const add = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const id = (e.target as HTMLButtonElement).value;
    dispatch(cartActions.add(Number(id)));
  };

  return (
    <>
      <Suspense fallback={"Загружаю..."}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <div className={styles["product-wrapper"]}>
              <div className={styles["product-header"]}>
                <Link to="/" className={styles["btn-back"]}>
                  <img src={backSvg} alt="" />
                </Link>
                <Title className={styles["product__name"]}>{data.name}</Title>
                <Button className={styles["product-cart__btn"]} onClick={add} value={data.id}>
                  <img src={cartAvg} alt="" />В корзину
                </Button>
              </div>
              <div className={styles["product-info"]}>
                <div className={styles["info__img"]}>
                  <img src={data.image} alt="" />
                </div>

                <div className={styles["info"]}>
                  <div className={styles["info__price"]}>
                    Цена{" "}
                    <p>
                      {data.price} <span>₽</span>
                    </p>
                  </div>
                  <div className={styles["info__rating"]}>
                    Рейтинг{" "}
                    <p>
                      {data.rating} <img src={starSvg} alt="" />
                    </p>
                  </div>
                  <div className={styles["info__compound"]}>
                    Состав:{" "}
                    <ul>
                      {data.ingredients.map((i) => (
                        <li key={i}>{i}</li>
                      ))}{" "}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
