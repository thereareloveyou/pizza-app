import styles from "./ProductCard.module.css";

import buySvg from "./../../images/buy-icon.svg";
import ratingSvg from "./../../images/stars-icon.svg";
import Button from "../Button/Button";
import { ProductCardProps } from "./ProductCard.props";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function ProductCard(props: ProductCardProps) {
  const {id} = props;
  const dispatch = useDispatch<AppDispath>();
  const add = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(cartActions.add(id));
  };

  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["product--info"]}>
        <img className={styles["product__img"]} src={props.image} alt="" />
        <Link to={`/product/${props.id}`} className={styles["link"]}>
          <div className={styles["product__name"]}>{props.title}</div>
        </Link>
        <div className={styles["product__description"]}>{props.description}</div>
      </div>
      <div className={styles["product__price"]}>
        {props.price} <span className={styles["span__value"]}>₽</span>
      </div>
      <Button className={styles["product--buy__btn"]} onClick={add}>
        <img src={buySvg} alt="" />
      </Button>
      <div className={styles["product-rating"]}>
        {props.rating} <img src={ratingSvg} alt="" />
      </div>
    </div>
  );
}

export default ProductCard;
