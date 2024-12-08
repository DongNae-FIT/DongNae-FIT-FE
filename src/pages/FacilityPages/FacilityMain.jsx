import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "@/pages/FacilityPages/FacilityMain.module.css";
import FacilityItem from "@/components/Facility/FacilityItem";
import useFacility from "@/hooks/useFacility";
import Loading from "@/utils/Loading";

const FacilityMain = () => {
  const { t, i18n } = useTranslation();
  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("program.align1"));

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0); // Store the selected category number
  const [pendingCategory, setPendingCategory] = useState(null); // Store category selection before apply

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { entireFacilityList, getEntireFacilityList, loading, error } =
    useFacility();

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    setSelectedAlign(t("program.align1"));
  }, [i18n.language, t]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const category = location.state?.category ?? 0;
        await getEntireFacilityList(setType(category));
      } catch (err) {
        console.error("Failed to fetch facility list:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setType = (category) => {
    switch (category) {
      case 0:
        return "";
      case 1:
        return "간이운동장";
      case 2:
        return "게이트볼장";
      case 3:
        return "축구장";
      case 4:
        return "수영장";
      case 5:
        return "생활체육관";
      case 6:
        return "기타시설";
      default:
        return ""; // 예외 처리
    }
  };

  const toggleCategory = (categoryNumber) => {
    setPendingCategory(categoryNumber); // Temporarily set the selected category
  };

  const resetCategories = async () => {
    setPendingCategory(null); // Reset pending category
    setSelectedCategory(null);
    try {
      await getEntireFacilityList("");
    } catch (error) {
      console.error("Failed to reset categories:", error);
    }
  };

  const handleCategoryApply = async () => {
    try {
      setSelectedCategory(pendingCategory); // Apply the selected category
      setCategoryOpen(false); // Close the category menu

      // Use pendingCategory directly to fetch the data
      await getEntireFacilityList(setType(pendingCategory));
    } catch (error) {
      console.error("Failed to apply category filter:", error);
    }
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
        setCategoryOpen(false);
        setPendingCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  if (loading || !entireFacilityList) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          }`}
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
        {entireFacilityList.map((facility) => (
          <FacilityItem
            key={facility.facilityId}
            facilityId={facility.facilityId}
            name={facility.facilityName}
            type={facility.facilityType}
            distance={facility.km}
            isPublic={true}
          />
        ))}

        {entireFacilityList.length === 0 && (
          <div className={styles["empty-message"]}>{t("empty_message")}</div>
        )}
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
                onClick={handleCategoryApply}
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
