import styles from "@/pages/GymPages/GymDetail.module.css";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

const GymDetail = () => {
  const { t } = useTranslation();
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
    <div className={styles["gym-detail"]}>
      <div className={styles["gym__map"]}>지도</div>

      <div className={styles["gym-detail__section"]}>
        <div className={styles["gym-detail__info"]}>시설 상세 정보</div>
      </div>
    </div>
  );
};

export default GymDetail;
