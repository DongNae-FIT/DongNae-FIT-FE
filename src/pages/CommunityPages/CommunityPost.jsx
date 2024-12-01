import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/CommunityPages/CommunityPost.module.css";
import CommunityComment from "@/components/CommunityComment";

const CommunityPost = () => {
  const { t } = useTranslation();

  const [commentValue, setCommentValue] = useState("");
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  const handleSubmitComment = () => {
    console.log(`${commentValue}`);
    console.log("submit");
  };

  const onLikeButtonClick = () => {
    setLike((prevLike) => !prevLike);
  };

  const onSaveButtonClick = () => {
    setSave((prevSave) => !prevSave);
  };

  return (
    <div className={styles["community-post"]}>
      <div className={styles["post-wrapper"]}>
        <div className={styles["post-info-wrapper"]}>
          <img
            src={"/default/default_profile.png"}
            className={styles["info-img"]}
          />
          <div className={styles["info-text"]}>
            <div className={styles["nickname"]}>사람은왜운동을해야하는가</div>
            <div className={styles["date"]}>2024.11.09 20:02</div>
          </div>
          <img
            src={"/icon/icon_dots_grey.png"}
            className={styles["dots-menu-icon"]}
            onClick={() => {}}
          />
        </div>
        <div className={styles["post-title"]}>구갈동 스포츠센터 어때요?</div>
        <div className={styles["post-content"]}>
          구갈동에 있는 스포츠센터 다니시는 분 있으신가요? 수영 다니고 싶은데
          어떤지 궁금해서요!
        </div>
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
              save ? styles["save--active"] : ""
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
      </div>
      <div className={styles["comment-wrapper"]}>
        <span className={styles["comment-title"]}>
          {t("community.comment")}
        </span>
        <CommunityComment
          nickname="홍길동"
          content="운동합시다. 건강해져요. 다들 운동하세요!!!!!!!!! 운동합시다. 건강해져요. 다들 운동하세요!!!!!!!!! 운동합시다. 건강해져요. 다들 운동하세요!!!!!!!!!"
        />
      </div>

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
  );
};

export default CommunityPost;
