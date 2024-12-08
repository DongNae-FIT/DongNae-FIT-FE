import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/ProgramPages/ProgramMain.module.css";
import ProgramItem from "@/components/Program/ProgramItem";
import KakaoMap from "@/components/KakaoMap";
import useProgram from "@/hooks/useProgram";
import Loading from "@/utils/Loading";

const ProgramMain = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isAlignOpen, setAlignOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState(t("program.align1"));
  const [isPriceOpen, setPriceOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { entireProgramList, getEntireProgramList, loading, error } =
    useProgram();
  const MAX_PRICE = 99999999999; // 99억 9999만 9999원
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const [warningMessage, setWarningMessage] = useState("");

  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntireProgramList();
      } catch (err) {
        console.error("Failed to fetch entrie programs:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (entireProgramList?.length > 0) {
      setLocations(extractLocations(entireProgramList));
    } else {
      setLocations([]);
    }
  }, [entireProgramList]);

  const applyPriceFilter = async () => {
    if (warningMessage) {
      window.alert(t("warning.price"));
      return;
    }

    try {
      setPriceOpen(false);

      const min = priceMin;
      const max = priceMax;

      await getEntireProgramList(min, max);
    } catch (error) {
      console.error("Failed to apply price filter:", error);
    }
  };

  const resetPriceFilter = async () => {
    try {
      setPriceOpen(false);

      await getEntireProgramList();
    } catch (error) {
      console.error("Failed to reset price filter:", error);
    }
  };

  const extractLocations = (programList) => {
    const locations = programList.map((program) => ({
      lat: parseFloat(program.facilityLatitude),
      lng: parseFloat(program.facilityLongitude),
      name: `${program.programId}`,
    }));
    return locations;
  };

  const handlePriceMinChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    value = value ? Number(value) : 0;
    checkPriceValidity(value, priceMax);
    setPriceMin(value);
  };

  const handlePriceMaxChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value ? Number(value) : 0;
    checkPriceValidity(priceMin, value);
    setPriceMax(value);
  };

  const checkPriceValidity = (min, max) => {
    if ((min > MAX_PRICE) | (max > MAX_PRICE)) {
      setWarningMessage(t("waring.max_price"));
    } else if (min && max && min > max) {
      setWarningMessage(t("warning.price"));
    } else {
      setWarningMessage("");
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedAlign(t("program.align1"));
  }, [i18n.language, t]);

  if (loading || !entireProgramList || !locations) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className={styles["program-main"]}>
      <KakaoMap locations={locations} mapHeight={300 * 0.9} />

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
                  selectedAlign === t("program.align1")
                    ? styles["selected-align"]
                    : ""
                }`}
                onClick={() => handleAlignSelect(t("program.align1"))}
              >
                {t("program.align1")}
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
          {t("program.filter1")}
        </div>
      </div>
      <div className={styles["program-list"]}>
        {entireProgramList.map((program) => (
          <ProgramItem
            key={program.programId}
            programId={program.programId}
            imgSrc={program.facilityImage}
            name={program.programName}
            facility={program.facilityName}
            price={`₩ ${program.programPrice.toLocaleString()}`}
          />
        ))}

        {entireProgramList.length === 0 ? (
          <div className={styles["empty-message"]}>{t("empty_message")}</div>
        ) : (
          <></>
        )}
      </div>

      {isPriceOpen && (
        <>
          <div className={styles.overlay} onClick={() => setPriceOpen(false)} />
          <div className={styles["price-filter"]}>
            <div className={styles["price-title"]}>{t("program.filter1")}</div>
            <div className={styles["price-content"]}>
              <input
                type="text"
                className={styles["price-input"]}
                placeholder={t("program.price_min_placeholder")}
                value={priceMin ? priceMin.toLocaleString() : ""} // 화면에 표시 시 숫자 포맷
                onChange={handlePriceMinChange}
              />
              <span className={styles["price-wave"]}>~</span>
              <input
                type="text"
                className={styles["price-input"]}
                placeholder={t("program.price_max_placeholder")}
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
                onClick={resetPriceFilter}
              >
                {t("buttons.reset")}
              </button>
              <button
                className={styles["apply-button"]}
                onClick={applyPriceFilter}
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

export default ProgramMain;
