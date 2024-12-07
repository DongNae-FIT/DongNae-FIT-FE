import styles from "@/pages/MyPages/Community/SavedPost.module.css";
import { useEffect } from "react";
import useMyPage from "@/hooks/useMyPage";
import CommunityItem from "@/components/Community/CommunityItem";

const SavedPost = () => {
  const { authInfo, getPostSaved, loading, error } = useMyPage();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getPostSaved();
      } catch (err) {
        console.error("Failed to fetch saved programs:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !authInfo) {
    return <p>Loading</p>;
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
          <div className={styles["empty-message"]}>게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SavedPost;
