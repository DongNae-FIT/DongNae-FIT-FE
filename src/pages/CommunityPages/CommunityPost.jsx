import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/CommunityPages/CommunityPost.module.css";
import CommunityComment from "@/components/Community/CommunityComment";
import { useNavigate, useParams } from "react-router-dom";
import useCommunity from "@/hooks/useCommunity";
import useAuth from "@/hooks/useAuth";

const CommunityPost = () => {
  const { t } = useTranslation();
  const { postId } = useParams();
  const {
    getPostDetail,
    postDetail,
    togglePostLike,
    togglePostSave,
    deletePost,
    writeComment,
    deleteComment,
    loading,
    error,
  } = useCommunity();
  const { isAuthenticated } = useAuth();

  const [commentValue, setCommentValue] = useState("");
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getPostDetail(postId);
        setLike(postDetail.postLikeStatus);
        setSave(postDetail.postSaveStatus);
      } catch (err) {
        console.log(err);
      }
    };
    initialize();
  }, []);

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  const handleSubmitComment = () => {
    const apiRequest = async () => {
      try {
        await writeComment(postId, commentValue);
      } catch (err) {
        console.error("Failed to fetch write comment:", err);
      }
    };
    apiRequest();
  };

  const onLikeButtonClick = async () => {
    if (!isAuthenticated) {
      window.alert("로그인이 필요합니다.");
      navigate("/login");
    }
    try {
      await togglePostLike(postId);
      setLike((prevLike) => !prevLike);
    } catch (err) {
      console.error("Failed to toggle like :", err);
    }
  };

  const onSaveButtonClick = async () => {
    if (!isAuthenticated) {
      window.alert("로그인이 필요합니다.");
      navigate("/login");
    }
    try {
      await togglePostSave(postId);
      setSave((prevSave) => !prevSave);
    } catch (err) {
      console.error("Failed to fetch toggle save:", err);
    }
  };

  if (loading || !postDetail) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles["community-post"]}>
      <div className={styles["post-wrapper"]}>
        <div className={styles["post-info-wrapper"]}>
          <img
            src={"/default/default_profile.png"}
            className={styles["info-img"]}
          />
          <div className={styles["info-text"]}>
            <div className={styles["nickname"]}>{postDetail.memberName}</div>
            <div className={styles["date"]}>{postDetail.postDate}</div>
          </div>
          <img
            src={"/icon/icon_dots_grey.png"}
            className={styles["dots-menu-icon"]}
            onClick={() => {}}
          />
        </div>
        <div className={styles["post-title"]}>{postDetail.postTitle}</div>
        <div className={styles["post-content"]}>{postDetail.postDetail}</div>
        <div className={styles["service-wrapper"]}>
          <div className={styles["post-button-wrapper"]}>
            <button
              className={`${styles["button"]} ${
                like ? styles["like-active"] : ""
              }`}
              onClick={onLikeButtonClick}
            >
              <img
                src={
                  like
                    ? "/icon/icon_likes_colored.png"
                    : "/icon/icon_likes_grey.png"
                }
                className={styles["button-icon"]}
              />
              {t("community.likes")}
            </button>
            <button
              className={`${styles["button"]} ${
                save ? styles["save-active"] : ""
              }`}
              onClick={onSaveButtonClick}
            >
              <img
                src={
                  save
                    ? "/icon/icon_save_colored.png"
                    : "/icon/icon_save_grey.png"
                }
                className={styles["button-icon"]}
              />
              {t("community.save")}
            </button>
          </div>
          <div className={styles["count-wrapper"]}>
            <div className={styles["like-count"]}>
              <img
                src={"/icon/icon_likes_colored.png"}
                className={styles["count-icon"]}
              />
              {postDetail.postLikeCount}
            </div>
            <div className={styles["save-count"]}>
              <img
                src={"/icon/icon_save_colored.png"}
                className={styles["count-icon"]}
              />
              {postDetail.postSaveCount}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["comment-wrapper"]}>
        <span className={styles["comment-title"]}>
          {t("community.comment")}
        </span>
        <div className={styles["comment-list"]}>
          {postDetail.comments.map((comment) => (
            <CommunityComment
              key={comment.commentId}
              nickname={comment.memberName}
              profileImg={comment.memberProfile}
              content={comment.commentDetail}
            />
          ))}
        </div>
      </div>
      <div className={styles["comment-input-wrapper"]}>
        <div className={styles["comment-input-box"]}>
          <input
            type="text"
            className={styles["comment-input"]}
            placeholder={t("community.comment_placeholder")}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            onKeyDown={handleEnterKeyDown}
          />
          <img
            src={"/icon/icon_submit_colored.png"}
            className={styles["comment-submit-icon"]}
            onClick={handleSubmitComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
