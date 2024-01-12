import styles from "./Title.module.css";
import { TitleProps } from "./Title.props";
import cn from "classnames";

function Title({ children, className, ...props }: TitleProps) {
  return (
    <div className={cn(styles["title"], className)} {...props}>
      {children}
    </div>
  );
}

export default Title;
