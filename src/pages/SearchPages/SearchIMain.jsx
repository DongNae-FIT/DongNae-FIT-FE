import React, { useState } from "react";
import styles from "@/pages/SearchPages/SearchIMain.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";

const SearchMain = () => {
  return (
    <div className={styles["search-main"]}>
      <SearchInputHeader />
    </div>
  );
};

export default SearchMain;
