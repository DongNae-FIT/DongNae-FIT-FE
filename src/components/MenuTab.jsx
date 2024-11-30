import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "@/components/MenuTab.module.css";

const MENU_ITEMS = [
  { key: "", label: "menus.home" },
  { key: "class", label: "menus.class" },
  { key: "gym", label: "menus.gym" },
  { key: "community", label: "menus.community" },
  { key: "mypage", label: "menus.mypage" },
];

const MenuTab = ({ menuRef, setShowMenu }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const initialMenu = location.pathname.split("/")[1] || "";
  const [selectedMenu, setSelectedMenu] = useState(initialMenu);

  const handleMenuClick = (link) => {
    setSelectedMenu(link);
    navigate(`/${link}`);
    setShowMenu(false);
  };

  return (
    <div ref={menuRef} className={styles["menu-tab"]}>
      <div className={styles["menu-tab__logo"]}>{t("title")}</div>
      <ul className={styles["menu-tab__menu-list"]}>
        {MENU_ITEMS.map(({ key, label }) => (
          <li
            key={key}
            className={
              selectedMenu === key ? styles["menu-item--selected"] : undefined
            }
            onClick={() => handleMenuClick(key)}
          >
            {t(label)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuTab;
