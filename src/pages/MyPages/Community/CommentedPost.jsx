import styles from "@/pages/MyPages/Community/CommentedPost.module.css";
import { useEffect } from "react";
import useMyPage from "@/hooks/useMyPage";
import CommunityItem from "@/components/Community/CommunityItem";
import Loading from "@/utils/Loading";
import { useTranslation } from "react-i18next";

const CommentedPost = () => {
  const { authInfo, getPostCommented, loading, error } = useMyPage();
  const { t } = useTranslation();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getPostCommented();
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
            date="2024-10-11 11:11:11"
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

export default CommentedPost;
