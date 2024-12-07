import React, { useEffect, useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";
import Resultclassification from "@/components/Search/Resultclassification";
import ProgramItem from "@/components/Program/ProgramItem";
import FacilityItem from "@/components/Facility/FacilityItem";
import CommunityItem from "@/components/Community/CommunityItem";
import useProgram from "@/hooks/useProgram";

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
        console.log(entireProgramList);
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !entireProgramList) {
    return <p>Loading</p>;
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
                price={`${program.programPrice.toLocaleString()}원`}
              />
            ))}

            {entireProgramList.length === 0 ? (
              <div className={styles["empty-message"]}>강좌가 없습니다.</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* <div className={styles["section"]}>
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
                주변 체육 시설이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.community")}</div>
          <div className={styles["item-list"]}>
            {searchResultAll.postData.length === 0 ? (
              <div className={styles["empty-message"]}>게시글이 없습니다.</div>
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
        </div> */}
      </div>
    </div>
  );
};

export default SearchResultProgram;
