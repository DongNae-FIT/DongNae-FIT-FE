import React, { useState } from "react";
import styles from "@/components/Search/SearchInputHeader.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SearchInputHeader = ({ searchInput = "" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchInput);

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(`엔터 : ${e.target.value}`);
      navigate("/search/result/all", { state: { searchInput: searchValue } });
    }
  };

  const handleDelete = () => {
    setSearchValue(""); // input 내용 초기화
    document.getElementById("searchInput").focus(); // input 활성화
  };

  return (
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
          onKeyDown={handleEnterKeyDown}
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
  );
};

export default SearchInputHeader;
