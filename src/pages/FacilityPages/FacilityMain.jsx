import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/FacilityPages/FacilityMain.module.css";
import FacilityItem from "@/components/Facility/FacilityItem";

const FacilityMain = () => {
  const { t, i18n } = useTranslation();
  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("program.align1"));

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [activeFilters, setActiveFilters] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAlign(t("program.align1"));
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
    <div className={styles["facility-main"]}>
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
                  selectedAlign === t("facility.align1")
                    ? styles["selected-item"]
                    : ""
                }`}
                onClick={() => handleAlignSelect(t("facility.align1"))}
              >
                {t("facility.align1")}
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
          {t("facility.category")}
        </div>
      </div>
      <div className={styles["facility-list"]}>
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
          isPublic={true}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
          isPublic={true}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
          isPublic={true}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
          isPublic={true}
        />
        <FacilityItem
          name={"홍익대학교운동장"}
          type={"공공운동장"}
          distance={"12.6km"}
        />
      </div>

      {isCategoryOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setCategoryOpen(false)}
          />
          <div className={styles["category-filter"]}>
            <div className={styles["category-title"]}>
              {t("facility.category")}
            </div>
            <div className={styles["category-list"]}>
              {[...Array(6)].map((_, index) => {
                const category = `category${index + 1}`;
                return (
                  <div
                    key={index}
                    className={`${styles["category-item"]} ${
                      selectedCategory[category]
                        ? styles["category-active"]
                        : ""
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {t(`facility.${category}`)}
                  </div>
                );
              })}
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

export default FacilityMain;
