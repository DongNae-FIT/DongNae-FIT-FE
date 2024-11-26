import React, { useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SearchResultAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleDelete = () => {
    setSearchValue(""); // input 내용 초기화
    document.getElementById("searchInput").focus(); // input 활성화
  };

  return (
    <div className={styles["search-main"]}>
      <div className={styles["search__header"]}>
        <img
          src={"/icon/icon_left_black.png"}
          className={styles["search__back-icon"]}
          onClick={() => navigate(-1)}
        />
        <div className={styles["search__input-container"]}>
          <input
            id="searchInput"
            type="text"
            className={styles["search__input"]}
            placeholder={t("search.placeholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <img
              src={"/icon/icon_delete_light.png"}
              className={styles["search__delete-icon"]}
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultAll;
