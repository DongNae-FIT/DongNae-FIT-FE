import styles from "@/pages/CommunityPages/CommunityPost.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CommunityPost = () => {
  const { t } = useTranslation();

  const [commentValue, setCommentValue] = useState("");

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(`엔터 : ${e.target.value}`);
    }
  };

  const handleSubmitComment = () => {
    console.log("submit");
  };

  return (
    <div className={styles["community-post"]}>
      <div className={styles["post__section"]}>
        <div className={styles["post__profile"]}>
          <img
            src={"/default/default_profile.png"}
            className={styles["post__profile-img"]}
          />
          <div className={styles["post__profile-text"]}>
            <div className={styles["post__profile-nickname"]}>
              사람은왜운동을해야하는가
            </div>
            <div className={styles["post__profile-date"]}>2024.11.09 20:02</div>
          </div>
          <img
            src={"/icon/icon_dots_grey.png"}
            className={styles["post__dots-icon"]}
            onClick={handleSubmitComment}
          />
        </div>
        <div className={styles["post__tite"]}>구갈동 스포츠센터 어때요?</div>
        <div className={styles["post__content"]}>
          구갈동에 있는 스포츠센터 다니시는 분 있으신가요? 수영 다니고 싶은데
          어떤지 궁금해서요!
        </div>
        <div className={styles["post__buttons"]}>
          <button className={styles["button"]}>
            <img
              src={"/icon/icon_likes_grey.png"}
              className={styles["post__icon"]}
              onClick={handleSubmitComment}
            />
            {t("community.likes")}
          </button>
          <button className={styles["button"]}>
            <img
              src={"/icon/icon_save_grey.png"}
              className={styles["post__icon"]}
              onClick={handleSubmitComment}
            />
            {t("community.save")}
          </button>
        </div>
      </div>
      <div className={styles["post__comments"]}>
        <span className={styles["comments__title"]}>
          {t("community.comment")}
        </span>
        <div className={styles["comment__section"]}>
          <div className={styles["comment__profile"]}>
            <img
              src={"/default/default_profile.png"}
              className={styles["comment__profile-img"]}
            />

            <div className={styles["comment__profile-nickname"]}>운동조아</div>
            <img
              src={"/icon/icon_dots_grey.png"}
              className={styles["comment__dots-icon"]}
              onClick={handleSubmitComment}
            />
          </div>
          <div className={styles["comment__content"]}>같이 운동합시당</div>
        </div>
      </div>
      <div className={styles["comment__input-container"]}>
        <input
          type="text"
          className={styles["comment__input"]}
          placeholder={t("community.comment_placeholder")}
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        <img
          src={"/icon/icon_submit_colored.png"}
          className={styles["comment__submit-icon"]}
          onClick={handleSubmitComment}
        />
      </div>
    </div>
  );
};

export default CommunityPost;
