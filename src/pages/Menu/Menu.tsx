import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";

import styles from "./Menu.module.css";

import { PREFIX } from "../../helpers/Api";
import { Product } from "../../interfaces/product.interface";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    getMenu(inputValue);
  }, [inputValue]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div className={styles["menu"]}>
        <Title>Меню</Title>
        <Search onChange={onChange} placeholder="Введите блюдо или состав" />
      </div>
      <div className={styles["card--list"]}>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты</>}
        {!isLoading && products.length === 0 && <>Не найдено</>}
      </div>
    </div>
  );
}

export default Menu;
