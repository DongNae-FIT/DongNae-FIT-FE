import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/ClassPages/ClassMain.module.css";
import ClassItem from "@/components/Class/ClassItem";

const ClassMain = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("class.align1"));
  const [isPriceOpen, setPriceOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const dropdownRef = useRef(null);

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const MAX_PRICE = 99999999999; // 99억 9999만 9999원
  const [warningMessage, setWarningMessage] = useState("");

  const handlePriceMinChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    value = value ? Number(value) : null; // 빈값은 null로 처리
    if (value > MAX_PRICE) value = MAX_PRICE; // 최대값 제한

    setPriceMin(value);
    checkPriceValidity(value, priceMax);
  };

  const handlePriceMaxChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    value = value ? Number(value) : null; // 빈값은 null로 처리
    if (value > MAX_PRICE) value = MAX_PRICE; // 최대값 제한

    setPriceMax(value);
    checkPriceValidity(priceMin, value);
  };

  const checkPriceValidity = (min, max) => {
    if (min && max && min > max) {
      setWarningMessage(`${t("warning.price")}`);
    } else {
      setWarningMessage(""); // 유효한 경우 경고 메시지 제거
    }
  };

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
        setPriceMax(0);
        setPriceMin(0);
        setWarningMessage("");
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
      <div className={styles["map"]}>지도</div>
      <div className={styles["filter-wrapper"]}>
        <div
          className={styles["dropdown-type"]}
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
                  selectedAlign === t("class.align1")
                    ? styles["selected-align"]
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
          className={styles["dropdown-type"]}
          onClick={() => setPriceOpen((prev) => !prev)}
        >
          <img
            src={"/icon/icon_down_grey.png"}
            className={styles["down-arrow-icon"]}
          />
          {t("class.filter1")}
        </div>

        {["filter2", "filter3"].map((filter, index) => (
          <div
            key={index}
            className={`${styles["toggle-type"]} ${
              activeFilters[filter] ? styles["filter-active"] : ""
            }`}
            onClick={() => toggleFilter(filter)}
          >
            {t(`class.${filter}`)}
          </div>
        ))}
      </div>
      <div className={styles["class-list"]}>
        <ClassItem name="강좌명" facility="시설이름" price="80,000원" />
        <ClassItem name="강좌명" facility="시설이름" price="80,000원" />
        <ClassItem name="강좌명" facility="시설이름" price="80,000원" />
      </div>

      {isPriceOpen && (
        <>
          <div className={styles.overlay} onClick={() => setPriceOpen(false)} />
          <div className={styles["price-filter"]}>
            <div className={styles["price-title"]}>{t("class.filter1")}</div>
            <div className={styles["price-content"]}>
              <input
                type="text"
                className={styles["price-input"]}
                placeholder={t("class.price_min_placeholder")}
                value={priceMin ? priceMin.toLocaleString() : ""} // 화면에 표시 시 숫자 포맷
                onChange={handlePriceMinChange}
              />
              <span className={styles["price-wave"]}>~</span>
              <input
                type="text"
                className={styles["price-input"]}
                placeholder={t("class.price_max_placeholder")}
                value={priceMax ? priceMax.toLocaleString() : ""} // 화면에 표시 시 숫자 포맷
                onChange={handlePriceMaxChange}
              />
            </div>

            {warningMessage && (
              <div className={styles["price-warning"]}>{warningMessage}</div>
            )}

            <div className={styles["price-button-wrapper"]}>
              <button
                className={styles["reset-button"]}
                onClick={() => {
                  setPriceMin(0);
                  setPriceMax(0);
                }}
              >
                {t("buttons.reset")}
              </button>
              <button
                className={styles["apply-button"]}
                onClick={() => {
                  if (warningMessage)
                    window.alert("최소 금액보다 최대 금액이 작습니다.");
                }}
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

export default ClassMain;
