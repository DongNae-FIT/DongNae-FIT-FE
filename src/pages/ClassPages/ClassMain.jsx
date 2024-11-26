import { useState, useEffect, useRef } from "react";
import styles from "@/pages/ClassPages/ClassMain.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ClassMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("class.align1"));
  const [activeFilters, setActiveFilters] = useState({});
  const dropdownRef = useRef(null);

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
    <div className={styles["class-main"]}>
      <div className={styles["class__map"]}>지도</div>
      <div className={styles["class__section1"]}>
        <div
          className={styles["class__align"]}
          onClick={() => setDropdownOpen((prev) => !prev)}
          ref={dropdownRef}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["class_down-icon"]}
          />
          {selectedAlign}
          {isDropdownOpen && (
            <div className={styles["dropdown-menu"]}>
              <div
                className={`${styles["dropdown-item"]} ${
                  selectedAlign === t("class.align1")
                    ? styles["selected-item"]
                    : ""
                }`}
                onClick={() => handleAlignSelect(t("class.align1"))}
              >
                {t("class.align1")}
              </div>
            </div>
          )}
        </div>

        {["filter1", "filter2", "filter3", "filter4"].map((filter, index) => (
          <div
            key={index}
            className={`${styles["class__filter"]} ${
              activeFilters[filter] ? styles["filter-active"] : ""
            }`}
            onClick={() => toggleFilter(filter)}
          >
            {t(`class.${filter}`)}
          </div>
        ))}
      </div>
      <div className={styles["class__section2"]}>
        <div
          className={styles["class__info"]}
          onClick={() => {
            navigate("/class/detail");
          }}
        >
          수업
        </div>
      </div>
    </div>
  );
};

export default ClassMain;
