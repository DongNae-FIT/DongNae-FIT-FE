import { useTranslation } from "react-i18next";

import styles from "@/components/Home/CommunityItemForHome.module.css";
import { useNavigate } from "react-router-dom";

const CommunityItemForHome = ({
  postId,
  profileImg = "/default/default_profile.png",
  nickname,
  title,
  content,
  date,
  likeCount,
  saveCount,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["community-item-for-home"]}
      onClick={() => {
        navigate(`/community/post/${postId}`);
      }}
    >
      <div className={styles["info-wrapper"]}>
        <img src={profileImg} className={styles["profile-img"]} />
        <div className={styles["nickname"]}>{nickname}</div>
      </div>

      <div className={styles["text-wrapper"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["content"]}>{content}</div>

        <div className={styles["footer-wrapper"]}>
          <div className={styles["date"]}>{date}</div>
          <div className={styles["count-wrapper"]}>
            <div className={styles["like-count"]}>
              <img
                src={"/icon/icon_likes_colored.png"}
                className={styles["count-icon"]}
              />
              {likeCount}
            </div>
            <div className={styles["save-count"]}>
              <img
                src={"/icon/icon_save_colored.png"}
                className={styles["count-icon"]}
              />
              {saveCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityItemForHome;
