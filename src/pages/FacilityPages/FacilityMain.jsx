import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "@/pages/FacilityPages/FacilityMain.module.css";
import FacilityItem from "@/components/Facility/FacilityItem";

const FacilityMain = () => {
  const { t, i18n } = useTranslation();
  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("program.align1"));

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Store the selected category number
  const [pendingCategory, setPendingCategory] = useState(null); // Store category selection before apply

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    setSelectedAlign(t("program.align1"));
  }, [i18n.language, t]);

  const toggleCategory = (categoryNumber) => {
    setPendingCategory(categoryNumber); // Temporarily set the selected category
  };

  const resetCategories = () => {
    setPendingCategory(null); // Reset pending category
  };

  const handleCategoryApply = () => {
    setSelectedCategory(pendingCategory); // Apply the selected category
    setCategoryOpen(false); // Close the category menu
  };

  const handleAlignSelect = (align) => {
    setSelectedAlign(align);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAlignOpen(false);
      }
      if (
        isCategoryOpen &&
        !event.target.closest(`.${styles["category-filter"]}`)
      ) {
        setCategoryOpen(false); // Close category menu when clicking outside
        // Reset only pendingCategory, not selectedCategory
        setPendingCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

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
          className={`${styles["category"]} ${
            selectedCategory || pendingCategory
              ? styles["category-selected"]
              : ""
          }`} // Apply additional style when a category is selected
          onClick={() => setCategoryOpen((prev) => !prev)}
        >
          <img
            src={
              selectedCategory || pendingCategory
                ? "/icon/icon_down_colored.png"
                : "/icon/icon_down_grey.png"
            }
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
        {/* 추가된 FacilityItem들 */}
      </div>

      {isCategoryOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => {
              setCategoryOpen(false);
              setPendingCategory(null); // Reset the pending category when clicking outside
            }}
          />
          <div className={styles["category-filter"]}>
            <div className={styles["category-title"]}>
              {t("facility.category")}
            </div>
            <div className={styles["category-list"]}>
              {[...Array(6)].map((_, index) => {
                const categoryNumber = index + 1;
                return (
                  <div
                    key={categoryNumber}
                    className={`${styles["category-item"]} ${
                      (pendingCategory || selectedCategory) === categoryNumber
                        ? styles["category-active"]
                        : ""
                    }`}
                    onClick={() => toggleCategory(categoryNumber)}
                  >
                    {t(`facility.category${categoryNumber}`)}
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
              <button
                className={styles["apply-button"]}
                onClick={handleCategoryApply} // Apply category when clicked
              >
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
