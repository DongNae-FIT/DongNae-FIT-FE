import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import MenuTab from "@/components/MenuTab";
import { useNavigate } from "react-router-dom";
import styles from "@/layouts/Header/DefaultHeader.module.css";

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
  };

  const onClickTitle = (e) => {
    navigate("/");
  };

  // useCallback을 사용하여 handleClickOutside 함수 메모리 최적화
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  }, []); // 의존성 배열이 비어 있어 최초 렌더링 시 한 번만 생성됨

  // 외부 클릭 감지 및 드롭다운 닫기
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); // handleClickOutside가 변경될 때만 이벤트 리스너 재등록

  return (
    <div className={styles.header}>
      <img
        src={"/icon/icon_menu_black.png"}
        className={styles["header__icon"]}
        onClick={() => setShowMenu(true)}
      />
      <div className={styles["header__title"]} onClick={onClickTitle}>
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
              className={
                selectedLang === "ko"
                  ? styles["header__language-dropdown__selected"]
                  : ""
              }
            >
              한국어
            </li>
            <li
              onClick={() => handleLangChange("en")}
              className={
                selectedLang === "en"
                  ? styles["header__language-dropdown__selected"]
                  : ""
              }
            >
              English
            </li>
          </ul>
        )}
      </div>

      {showMenu && (
        <>
          <div
            className={styles["header__overlay"]}
            onClick={() => setShowMenu(false)}
          />
          <MenuTab menuRef={menuRef} setShowMenu={setShowMenu} />
        </>
      )}
    </div>
  );
};

export default DefaultHeader;
