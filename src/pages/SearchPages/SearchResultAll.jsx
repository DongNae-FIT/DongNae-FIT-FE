import React, { useEffect, useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";
import Resultclassification from "@/components/Search/Resultclassification";
import useMain from "@/hooks/useMain";
import ProgramItem from "@/components/Program/ProgramItem";
import FacilityItem from "@/components/Facility/FacilityItem";
import CommunityItem from "@/components/Community/CommunityItem";

const SearchResultAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { SearchAll, searchResultAll, loading, error } = useMain();

  useEffect(() => {
    const initialize = async () => {
      try {
        await SearchAll(location.state.searchInput);
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    loading ||
    !searchResultAll.programData ||
    !searchResultAll.facilityData ||
    !searchResultAll.postData
  ) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className={styles["search-main"]}>
      <SearchInputHeader searchInput={location.state.searchInput} />
      <Resultclassification searchInput={location.state.searchInput} />

      <div className={styles["section-list"]}>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.program")}</div>
          <div className={styles["item-list"]}>
            {searchResultAll.programData.map((program) => (
              <ProgramItem
                key={program.programId}
                programId={program.programId}
                name={program.programName}
                facility={program.facilityName}
                price={`₩ ${program.programPrice.toLocaleString()}`}
              />
            ))}

            {searchResultAll.programData.length === 0 ? (
              <div className={styles["empty-message"]}>
                {t("empty_message")}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.facility")}</div>
          <div className={styles["item-list"]}>
            {searchResultAll.facilityData.map((facility) => (
              <FacilityItem
                key={facility.facilityId}
                facilityId={facility.facilityId}
                name={facility.facilityName}
                type={facility.facilityType}
                distance={facility.km}
                isPublic={true}
              />
            ))}

            {searchResultAll.facilityData.length === 0 && (
              <div className={styles["empty-message"]}>
                {t("empty_message")}
              </div>
            )}
          </div>
        </div>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.community")}</div>
          <div className={styles["item-list"]}>
            {searchResultAll.postData.length === 0 ? (
              <div className={styles["empty-message"]}>
                {t("empty_message")}
              </div>
            ) : (
              searchResultAll.postData.map((post) => (
                <CommunityItem
                  key={post.postId}
                  postId={post.postId}
                  title={post.postTitle}
                  content={post.postDetail}
                  imgSrc={post.postImage}
                  date="2024-10-11 11:11:11"
                  likeCount={post.postLikeCount}
                  saveCount={post.postSaveCount}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultAll;
