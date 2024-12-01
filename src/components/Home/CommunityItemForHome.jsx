import { useTranslation } from "react-i18next";

import styles from "@/components/Home/CommunityItemForHome.module.css";

const CommunityItemForHome = ({
  profileImg = "/default/default_profile.png",
  nickname,
  title,
  content,
}) => {
  return (
    <div className={styles["community-item-for-home"]}>
      <div className={styles["info-wrapper"]}>
        <img src={profileImg} className={styles["profile-img"]} />
        <div className={styles["nickname"]}>{nickname}</div>
      </div>

      <div className={styles["text-wrapper"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["content"]}>{content}</div>
      </div>
    </div>
  );
};

export default CommunityItemForHome;
