import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/components/Community/CommunityItem.module.css";

const CommunityItem = ({ postId, title, content, imgSrc }) => {
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
      </div>
      {imgSrc ? <img src={imgSrc} className={styles["post-img"]} /> : ""}
    </div>
  );
};

export default CommunityItem;
