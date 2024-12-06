import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/components/Community/CommunityItem.module.css";

const CommunityItem = ({
  postId,
  title,
  content,
  imgSrc,
  date,
  likeCount,
  saveCount,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className={styles["community-item"]}
      onClick={() => {
        navigate(`/community/post/${postId}`);
      }}
    >
      <div className={styles["text-wrapper"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["content"]}>{content}</div>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["date"]}>{date}</div>
          <span className={styles["divider"]}>|</span>
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
      {imgSrc ? <img src={imgSrc} className={styles["post-img"]} /> : ""}
    </div>
  );
};

export default CommunityItem;
