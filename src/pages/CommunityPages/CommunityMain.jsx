import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/CommunityPages/CommunityMain.module.css";
import CommunityItem from "@/components/Community/CommunityItem";
import { useEffect } from "react";
import useCommunity from "@/hooks/useCommunity";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";

const CommunityMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entirePostList, getEntirePostList, loading, error } = useCommunity();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntirePostList();
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWriteClicked = () => {
    navigate("/community/new/post");
  };

  const formattedDate = (data) => {
    return format(new Date(data), "yy/MM/dd HH:mm");
  };

  return (
    <div className={styles["community-main"]}>
      <div className={styles["post-list"]}>
        {entirePostList.length === 0 ? (
          <div className={styles["empty-message"]}>{t("empty_message")}</div>
        ) : (
          entirePostList.map((post) => (
            <CommunityItem
              key={post.postId}
              postId={post.postId}
              title={post.postTitle}
              content={post.postDetail}
              imgSrc={post.postImage}
              date={formattedDate(post.postDate)}
              likeCount={post.postLikeCount}
              saveCount={post.postSaveCount}
              //  postId,  title,  content,  imgSrc,  date,  likeCount,  saveCount,
              //postId, postTitle, postDetail, postImage, postLikeCount, postSaveCount
            />
          ))
        )}
      </div>
      <button className={styles["write-button"]} onClick={onWriteClicked}>
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write-icon"]}
        />
        {t("community.write")}
      </button>
    </div>
  );
};

export default CommunityMain;
