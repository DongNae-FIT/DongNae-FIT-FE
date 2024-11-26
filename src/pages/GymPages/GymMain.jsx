import styles from "@/pages/GymPages/GymMain.module.css";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GymMain = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("class.align1"));
  const [activeFilters, setActiveFilters] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleFilter = (filterName) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleAlignSelect = (align) => {
    setSelectedAlign(align);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["gym-main"]}>
      <div className={styles["gym__section1"]}>
        <div
          className={styles["gym__align"]}
          onClick={() => setDropdownOpen((prev) => !prev)}
          ref={dropdownRef}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["gym_down-icon"]}
          />
          {selectedAlign}
          {isDropdownOpen && (
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
        <div className={styles["gym__category"]}>
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["gym_down-icon"]}
          />
          {t("gym.category")}
        </div>

        {[...Array(1)].map((_, index) => {
          const filterName = `filter${index + 1}`;
          return (
            <div
              key={index}
              className={`${styles["gym__filter"]} ${
                activeFilters[filterName] ? styles["filter-active"] : ""
              }`}
              onClick={() => toggleFilter(filterName)}
            >
              {t(`gym.${filterName}`)}
            </div>
          );
        })}
      </div>
      <div className={styles["gym__section2"]}>
        <div
          className={styles["gym__info"]}
          onClick={() => {
            navigate("/gym/detail");
          }}
        >
          시설
        </div>
      </div>
    </div>
  );
};

export default GymMain;
