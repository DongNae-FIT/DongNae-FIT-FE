import React, { useEffect, useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";
import Resultclassification from "@/components/Search/Resultclassification";
import FacilityItem from "@/components/Facility/FacilityItem";
import useFacility from "@/hooks/useFacility";

const SearchResultFacility = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { getEntireFacilityList, entireFacilityList, loading, error } =
    useFacility();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntireFacilityList(undefined, location.state.searchInput);
        console.log(entireFacilityList);
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !entireFacilityList) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className={styles["search"]}>
      <SearchInputHeader searchInput={location.state.searchInput} />
      <Resultclassification type={3} searchInput={location.state.searchInput} />

      <div className={styles["section-list"]}>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.facility")}</div>
          <div className={styles["item-list"]}>
            {entireFacilityList.map((facility) => (
              <FacilityItem
                key={facility.facilityId}
                facilityId={facility.facilityId}
                name={facility.facilityName}
                type={facility.facilityType}
                distance={facility.km}
                isPublic={true}
              />
            ))}

            {entireFacilityList.length === 0 && (
              <div className={styles["empty-message"]}>
                주변 체육 시설이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultFacility;
