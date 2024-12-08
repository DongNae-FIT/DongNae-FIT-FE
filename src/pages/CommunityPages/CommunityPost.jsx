import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/CommunityPages/CommunityPost.module.css";
import CommunityComment from "@/components/Community/CommunityComment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCommunity from "@/hooks/useCommunity";
import useAuth from "@/hooks/useAuth";
import Loading from "@/utils/Loading";
import { format } from "date-fns";

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
  const locatoin = useLocation();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getPostDetail(postId);
        if (postDetail) {
          setLike(postDetail.postLikeStatus);
          setSave(postDetail.postSaveStatus);
        }
      } catch (err) {
        console.log(err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        location.reload();
      } catch (err) {
        console.error("Failed to fetch write comment:", err);
      }
    };
    apiRequest();
  };

  const onLikeButtonClick = async () => {
    if (!isAuthenticated) {
      window.alert(t("warning.need_login"));
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
      window.alert(t("warning.need_login"));
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
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message || "An unknown error occurred"}</p>;
  }

  const formattedDate = (data) => {
    return format(new Date(data), "yy/MM/dd HH:mm");
  };

  return (
    <div className={styles["community-post"]}>
      <div className={styles["post-wrapper"]}>
        <div className={styles["post-info-wrapper"]}>
          <img
            src={
              postDetail.memberProfile
                ? postDetail.memberProfile
                : "/default/default_profile.png"
            }
            className={styles["info-img"]}
          />
          <div className={styles["info-text"]}>
            <div className={styles["nickname"]}>{postDetail.memberName}</div>
            <div className={styles["date"]}>
              {formattedDate(postDetail.postDate)}
            </div>
          </div>
          <img
            src={"/icon/icon_dots_grey.png"}
            className={styles["dots-menu-icon"]}
            onClick={() => {}}
          />
        </div>
        <div className={styles["post-title"]}>{postDetail.postTitle}</div>
        <div className={styles["post-content"]}>{postDetail.postDetail}</div>
        {postDetail.postImage && (
          <img src={postDetail.postImage} className={styles["post-img"]} />
        )}
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
          {postDetail.comments.length === 0 ? (
            <div className={styles["empty-message"]}>{t("empty_message")}</div>
          ) : (
            postDetail.comments.map((comment) => (
              <CommunityComment
                key={comment.commentId}
                profileImg={
                  comment.memberProfile
                    ? comment.memberProfile
                    : "/default/default_profile.png"
                }
                nickname={comment.memberName}
                content={comment.commentDetail}
              />
            ))
          )}
        </div>
      </div>
      <div className={styles["comment-input-wrapper"]}>
        <div className={styles["comment-input-box"]}>
          <input
            type="text"
            className={styles["comment-input"]}
            placeholder={
              isAuthenticated
                ? t("community.comment_placeholder")
                : t("warning.need_login")
            }
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            onKeyDown={handleEnterKeyDown}
            disabled={isAuthenticated ? false : true}
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
