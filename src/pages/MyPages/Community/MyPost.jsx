import styles from "@/pages/MyPages/Community/MyPost.module.css";

import { useEffect } from "react";
import useMyPage from "@/hooks/useMyPage";
import CommunityItem from "@/components/Community/CommunityItem";
import Loading from "@/utils/Loading";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

const MyPost = () => {
  const { authInfo, getMyPost, loading, error } = useMyPage();
  const { t } = useTranslation();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getMyPost();
      } catch (err) {
        console.error("Failed to fetch saved programs:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !authInfo) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const formattedDate = (data) => {
    return format(new Date(data), "yy/MM/dd HH:mm");
  };

  return (
    <div className={styles["community"]}>
      <div className={styles["post-list"]}>
        {authInfo.map((post) => (
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
        {authInfo.length === 0 && (
          <div className={styles["empty-message"]}>{t("empty_message")}</div>
        )}
      </div>
    </div>
  );
};

export default MyPost;
