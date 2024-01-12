import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

import logo from "./../../images/Logo.svg";

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src={logo} alt="" />
      </div>

      <div className={styles["outlet"]}>
        <Outlet />
      </div>
    </div>
  );
}
