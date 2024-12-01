import { useTranslation } from "react-i18next";

import styles from "@/components/Community/CommunityItem.module.css";

const CommunityItem = ({ title, content, imgSrc }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["community-item"]}>
      <div className={styles["text-wrapper"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["content"]}>{content}</div>
      </div>
      {imgSrc ? <img src={imgSrc} className={styles["post-img"]} /> : ""}
    </div>
  );
};

export default CommunityItem;
