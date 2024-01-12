import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from "classnames";

import searchSvg from "../../images/search-icon.svg";
import { forwardRef } from "react";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ className, ...props }, ref) {
    return (
      <div className={styles["input__wrapper"]}>
        <img  className={styles['icon']} src={searchSvg} alt="" />
        <input ref={ref} className={cn(styles["search__input"], className)} {...props}></input>
      </div>
    );
  });
  
  export default Search;