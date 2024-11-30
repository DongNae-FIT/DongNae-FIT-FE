import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/GymPages/GymMain.module.css";

const GymMain = () => {
  const { t, i18n } = useTranslation();
  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("class.align1"));

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [activeFilters, setActiveFilters] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAlign(t("class.align1"));
  }, [i18n.language, t]);

  const toggleFilter = (filterName) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleCategory = (categoryName) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const resetCategories = () => {
    setSelectedCategory((prevCategories) => {
      const resetCategories = {};
      Object.keys(prevCategories).forEach((category) => {
        resetCategories[category] = false;
      });
      return resetCategories;
    });
  };

  const handleAlignSelect = (align) => {
    setSelectedAlign(align);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAlignOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["gym-main"]}>
      <div className={styles["filter-section"]}>
        <div
          className={styles["align"]}
          onClick={() => setAlignOpen((prev) => !prev)}
          ref={dropdownRef}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["down-arrow-icon"]}
          />
          {selectedAlign}
          {isAlignOpen && (
            <div className={styles["dropdown-menu"]}>
              <div
                className={`${styles["dropdown-item"]} ${
                  selectedAlign === t("gym.align1")
                    ? styles["selected-item"]
                    : ""
                }`}
                onClick={() => handleAlignSelect(t("gym.align1"))}
              >
                {t("gym.align1")}
              </div>
            </div>
          )}
        </div>
        <div
          className={styles["category"]}
          onClick={() => setCategoryOpen((prev) => !prev)}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["down-arrow-icon"]}
          />
          {t("gym.category")}
        </div>

        {[...Array(1)].map((_, index) => {
          const filterName = `filter${index + 1}`;
          return (
            <div
              key={index}
              className={`${styles["toggle-type"]} ${
                activeFilters[filterName] ? styles["filter-active"] : ""
              }`}
              onClick={() => toggleFilter(filterName)}
            >
              {t(`gym.${filterName}`)}
            </div>
          );
        })}
      </div>
      <div className={styles["gym-item-wrapper"]}>
        <div
          className={styles["gym-item"]}
          onClick={() => {
            navigate("/gym/detail");
          }}
        >
          시설
        </div>
      </div>

      {isCategoryOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setCategoryOpen(false)}
          />
          <div className={styles["category-filter"]}>
            <div className={styles["category-title"]}>{t("gym.category")}</div>
            <div className={styles["category-list"]}>
              {["category1", "category2"].map((category, index) => (
                <div
                  key={index}
                  className={`${styles["category-item"]} ${
                    selectedCategory[category] ? styles["category-active"] : ""
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {t(`gym.${category}`)}
                </div>
              ))}
            </div>
            <div className={styles["category-button-wrapper"]}>
              <button
                className={styles["reset-button"]}
                onClick={resetCategories}
              >
                {t("buttons.reset")}
              </button>
              <button className={styles["apply-button"]}>
                {t("buttons.apply")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GymMain;
