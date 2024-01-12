import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";

import avatarSvg from "./../../images/Intersect.png";
import menuSvg from "./../../images/menu-icon.svg";
import cartSvg from "./../../images/cart-icon.svg";
import buttonSvg from "./../../images/exit-icon.svg";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { userActions, userData } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["menu"]}>
        <div className={styles["user"]}>
          <img src={avatarSvg} alt="" />
          <div className={styles["user__info"]}>
            <div className={styles["info__name"]}>{profile?.name}</div>
            <div className={styles["info__email"]}>{profile?.email}</div>
          </div>
        </div>
        <div className={styles["menu__nav"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src={menuSvg} alt="" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src={cartSvg} alt="" />
            Корзина <span>{items.reduce((acc, item) => (acc += item.count), 0)}</span>
          </NavLink>
        </div>
        <Button className={styles["button_exit"]} onClick={logout}>
          <img src={buttonSvg} alt="" />
          Выход
        </Button>
      </div>
      <div className={styles["outlet"]}>
        <Outlet />
      </div>
    </div>
  ); 
}
