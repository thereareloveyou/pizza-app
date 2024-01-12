import ProductCard from "../../../components/ProductCart/ProductCard";
import { MenuListProps } from "./MenuList.props";
import styles from "./MenuList.module.css";

export function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles['wrapper-list']}>
      {products.map((p) => (
        <ProductCard key={p.id} id={p.id} title={p.name} description={p.ingredients.join(", ")} image={p.image} price={p.price} rating={p.rating} />
      ))}
    </div>
  );
}
