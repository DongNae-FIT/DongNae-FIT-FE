import { useTranslation } from "react-i18next";

import styles from "@/components/Community/CommunityComment.module.css";

const CommunityComment = ({
  profileImg = "/default/default_profile.png",
  nickname,
  content,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles["community-comment"]}>
      <div className={styles["info-wrapper"]}>
        <img src={profileImg} className={styles["profile-img"]} />

        <div className={styles["nickname"]}>{nickname}</div>
        <img
          src={"/icon/icon_dots_grey.png"}
          className={styles["dots-menu-icon"]}
          onClick={() => {}}
        />
      </div>
      <div className={styles["content"]}>{content}</div>
    </div>
  );
};

export default CommunityComment;
