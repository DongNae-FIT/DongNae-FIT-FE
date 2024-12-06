import React, { useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";
import Resultclassification from "@/components/Search/Resultclassification";

const SearchResultAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles["search-main"]}>
      <SearchInputHeader searchInput={location.state.searchInput} />
      <Resultclassification searchInput={location.state.searchInput} />
    </div>
  );
};

export default SearchResultAll;
