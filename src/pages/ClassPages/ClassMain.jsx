import { useState, useEffect, useRef } from "react";
import styles from "@/pages/ClassPages/ClassMain.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ClassMain = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("class.align1"));
  const [isPriceOpen, setPriceOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const dropdownRef = useRef(null);

  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();

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
        setAlignOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedAlign(t("class.align1"));
  }, [i18n.language, t]);

  return (
    <div className={styles["class-main"]}>
      <div className={styles["class__map"]}>지도</div>
      <div className={styles["class__section1"]}>
        <div
          className={styles["class__dropdown"]}
          onClick={() => setAlignOpen((prev) => !prev)}
          ref={dropdownRef}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["class_down-icon"]}
          />
          {selectedAlign}
          {isAlignOpen && (
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
        <div
          className={styles["class__dropdown"]}
          onClick={() => setPriceOpen((prev) => !prev)}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["class_down-icon"]}
          />
          {t("class.filter1")}
        </div>

        {["filter3", "filter4"].map((filter, index) => (
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

      {isPriceOpen && (
        <>
          <div className={styles.overlay} onClick={() => setPriceOpen(false)} />
          <div className={styles["price-filter"]}>
            <div className={styles["price__title"]}>{t("class.filter1")}</div>
            <div className={styles["price__container"]}>
              <input
                type="number"
                className={styles["price__input"]}
                placeholder={t("class.price_max_placeholder")}
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <span className={styles["price__wave"]}>~</span>
              <input
                type="number"
                className={styles["price__input"]}
                placeholder={t("class.price_max_placeholder")}
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
            <div className={styles["price__buttons"]}>
              <button
                className={styles["reset-button"]}
                onClick={() => {
                  setPriceMin(0);
                  setPriceMax(0);
                }}
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

export default ClassMain;
