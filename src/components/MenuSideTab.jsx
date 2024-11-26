import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "@/components/MenuSideTab.module.css";
import { useTranslation } from "react-i18next";

const MenuSideTab = ({ menuRef, setShowMenu }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const initialMenu = location.pathname.split("/")[1] || "";
  const [selectedMenu, setSelectedMenu] = useState(initialMenu);

  const handleMenuClick = (Link) => {
    setSelectedMenu(Link);
    navigate(`/${Link}`);
    setShowMenu(false);
  };

  return (
    <div ref={menuRef} className={styles.sidetab}>
      <div className={styles["sidetab__logo"]}>{t("title")}</div>
      <ul className={styles["sidetab__menus"]}>
        <li
          className={selectedMenu === "" ? styles["menu__selected"] : undefined}
          onClick={() => handleMenuClick("")}
        >
          {t("menus.home")}
        </li>
        <li
          className={
            selectedMenu === "class" ? styles["menu__selected"] : undefined
          }
          onClick={() => handleMenuClick("class")}
        >
          {t("menus.class")}
        </li>
        <li
          className={
            selectedMenu === "gym" ? styles["menu__selected"] : undefined
          }
          onClick={() => handleMenuClick("gym")}
        >
          {t("menus.gym")}
        </li>
        <li
          className={
            selectedMenu === "community" ? styles["menu__selected"] : undefined
          }
          onClick={() => handleMenuClick("community")}
        >
          {t("menus.community")}
        </li>
        <li
          className={
            selectedMenu === "mypage" ? styles["menu__selected"] : undefined
          }
          onClick={() => handleMenuClick("mypage")}
        >
          {t("menus.mypage")}
        </li>
      </ul>
    </div>
  );
};

export default MenuSideTab;
