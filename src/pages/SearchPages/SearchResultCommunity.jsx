import React, { useEffect, useState } from "react";
import styles from "@/pages/SearchPages/SearchResultAll.module.css";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputHeader from "@/components/Search/SearchInputHeader";
import Resultclassification from "@/components/Search/Resultclassification";
import CommunityItem from "@/components/Community/CommunityItem";
import useCommunity from "@/hooks/useCommunity";
import Loading from "@/utils/Loading";
import { format } from "date-fns";

const SearchResultCommunity = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { getEntirePostList, entirePostList, loading, error } = useCommunity();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntirePostList(location.state.searchInput);
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !entirePostList) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const formattedDate = (data) => {
    return format(new Date(data), "yy/MM/dd HH:mm");
  };

  return (
    <div className={styles["search"]}>
      <SearchInputHeader searchInput={location.state.searchInput} />
      <Resultclassification type={4} searchInput={location.state.searchInput} />

      <div className={styles["section-list"]}>
        <div className={styles["section"]}>
          <div className={styles["title"]}>{t("menus.community")}</div>
          <div className={styles["item-list"]}>
            {entirePostList.map((post) => (
              <CommunityItem
                key={post.postId}
                postId={post.postId}
                title={post.postTitle}
                content={post.postDetail}
                imgSrc={post.postImage}
                date={formattedDate(post.postDate)}
                likeCount={post.postLikeCount}
                saveCount={post.postSaveCount}
              />
            ))}
            {entirePostList.length === 0 && (
              <div className={styles["empty-message"]}>
                {t("empty_message")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCommunity;
