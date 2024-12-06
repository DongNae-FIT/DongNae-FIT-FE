import React from "react";
import styles from "@/components/Search/Resultclassification.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Resultclassification = ({ type = 1, searchInput }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles["classification-header"]}>
      <div
        className={`${styles["classification"]} ${
          type === 1 ? styles["selected"] : ""
        }`}
        onClick={() => {
          navigate("/search/result/all", {
            state: { searchInput: searchInput },
          });
        }}
      >
        {t("search.all")}
      </div>
      <div
        className={`${styles["classification"]} ${
          type === 2 ? styles["selected"] : ""
        }`}
      >
        {t("menus.program")}
      </div>
      <div
        className={`${styles["classification"]} ${
          type === 3 ? styles["selected"] : ""
        }`}
      >
        {t("menus.facility")}
      </div>
      <div
        className={`${styles["classification"]} ${
          type === 4 ? styles["selected"] : ""
        }`}
      >
        {t("menus.community")}
      </div>
    </div>
  );
};

export default Resultclassification;
