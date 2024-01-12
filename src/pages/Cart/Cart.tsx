import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { CartItem } from "../../components/CartItem/CartItem";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";

import styles from "./Cart.module.css";
import { AppDispath, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/Api";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

export const DELIVERY_VALUE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const dispath = useDispatch<AppDispath>();
  const navigate = useNavigate();

  const sumPriceProducts = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  useEffect(() => {
    loadAllItems();
  }, [items]);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispath(cartActions.clean());
    navigate("/success");
  };

  return (
    <div>
      <Title>Корзина</Title>
      <div className={styles["cart-wrapper"]}>
        <div className={styles["cart"]}>
          {items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
              return;
            }
            return <CartItem key={i.id} count={i.count} {...product}></CartItem>;
          })}
          <div className={styles["input-promo"]}>
            <Input className={styles["promo"]} placeholder="Промокод" />
            <Button className={styles["enter__promo"]}>Применить</Button>
          </div>
        </div>
        <div className={styles["info--order"]}>
          <div className={styles["point"]}>
            Итог
            <p>{sumPriceProducts} ₽</p>
          </div>
          <hr />
          <div className={styles["point"]}>
            Доставка
            <p>{DELIVERY_VALUE} ₽</p>
          </div>
          <hr />
          <div className={styles["point"]}>
            Итог ({items.reduce((acc, item) => (acc += item.count), 0)})
            <p>
              <span> {sumPriceProducts + DELIVERY_VALUE} ₽</span>
            </p>
          </div>
        </div>
        <Button className={styles["submit__order"]} appearance="big" onClick={checkout}>
          Оформить
        </Button>
      </div>
    </div>
  );
}
