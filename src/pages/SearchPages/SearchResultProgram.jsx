import React, { useEffect, useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";
import Resultclassification from "@/components/Search/Resultclassification";
import ProgramItem from "@/components/Program/ProgramItem";

import useProgram from "@/hooks/useProgram";
import Loading from "@/utils/Loading";

const SearchResultProgram = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { getEntireProgramList, entireProgramList, loading, error } =
    useProgram();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntireProgramList(
          undefined,
          undefined,
          location.state.searchInput
        );
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !entireProgramList) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className={styles["search"]}>
      <SearchInputHeader searchInput={location.state.searchInput} />
      <Resultclassification type={2} searchInput={location.state.searchInput} />

      <div className={styles["section-list"]}>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.program")}</div>
          <div className={styles["item-list"]}>
            {entireProgramList.map((program) => (
              <ProgramItem
                key={program.programId}
                programId={program.programId}
                name={program.programName}
                facility={program.facilityName}
                price={`₩ ${program.programPrice.toLocaleString()}`}
              />
            ))}

            {entireProgramList.length === 0 ? (
              <div className={styles["empty-message"]}>
                {t("empty_message")}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultProgram;
