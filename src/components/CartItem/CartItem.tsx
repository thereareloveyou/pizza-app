import styles from "./CartItem.module.css";

import exitSvg from "./../../images/exit-cart-icon.svg";
import plusSvg from "./../../images/plus-btn.svg";
import minusSvg from "./../../images/minus-btn.svg";
import { CartItemProps } from "./CartItem.props";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export function CartItem(props: CartItemProps) {
  const dispath = useDispatch<AppDispath>();

  const increase = () => {
    dispath(cartActions.add(props.id));
  };

  const descrease = () => {
    dispath(cartActions.remove(props.id));
  };

  const remove = () => {
    dispath(cartActions.delete(props.id));
  };

  return (
    <div className={styles["cart-item"]}>
      <div className={styles["item-img"]}>
        <img className={styles["image"]} src={props.image} alt="" />
      </div>
      <div className={styles["item-info"]}>
        <div className={styles["item__name"]}>{props.name}</div>
        <div className={styles["item__price"]}>
          {props.price}
          <span className={styles["span__value"]}>₽</span>
        </div>
      </div>
      <div className={styles["item-counter"]}>
        <button className={styles["counter__minus"]} onClick={descrease}>
          <img src={minusSvg} alt="" />
        </button>
        <div className={styles["counter"]}>{props.count}</div>
        <button className={styles["counter__plus"]} onClick={increase}>
          <img src={plusSvg} alt="" />
        </button>
        <button className={styles["delete-item"]} onClick={remove}>
          <img src={exitSvg} alt="" />
        </button>
      </div>
    </div>
  );
}
