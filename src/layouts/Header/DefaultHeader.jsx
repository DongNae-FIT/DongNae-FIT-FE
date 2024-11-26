import styles from "@/layouts/Header/DefaultHeader.module.css";
import { useTranslation } from "react-i18next";
import MenuSideTab from "@/components/MenuSideTab";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DefaultHeader = () => {
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language); // 현재 선택된 언어 상태 추가
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang); // 언어 변경 시 선택된 언어 업데이트
    setShowDropdown(false);
    console.log(lang);
  };

  const onClickTitle = (e) => {
    navigate("/");
  };

  // 외부 클릭 감지 및 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.header}>
      <img
        src={"/icon/icon_menu_black.png"}
        className={styles["header__icon"]}
        onClick={() => setShowMenu(true)}
      />
      <div
        className={`${styles["header__title"]} ${
          selectedLang === "ko"
            ? styles["header__title-ko"]
            : styles["header__title-en"]
        }`}
        onClick={onClickTitle}
      >
        {t("title")}
      </div>

      <img
        src={"/icon/icon_search_black.png"}
        className={styles["header__icon"]}
        onClick={() => {
          navigate("/search");
        }}
      />
      <div className={styles["header__language"]} ref={dropdownRef}>
        <img
          className={styles["header__icon"]}
          src={"/icon/icon_lang_black.png"}
          onClick={() => setShowDropdown((prev) => !prev)}
        />
        {showDropdown && (
          <ul className={styles["header__language-dropdown"]}>
            <li
              onClick={() => handleLangChange("ko")}
              className={selectedLang === "ko" ? styles.selected : ""}
            >
              한국어
            </li>
            <li
              onClick={() => handleLangChange("en")}
              className={selectedLang === "en" ? styles.selected : ""}
            >
              English
            </li>
          </ul>
        )}
      </div>

      {showMenu && (
        <>
          <div className={styles.overlay} onClick={() => setShowMenu(false)} />
          <MenuSideTab menuRef={menuRef} setShowMenu={setShowMenu} />
        </>
      )}
    </div>
  );
};

export default DefaultHeader;
