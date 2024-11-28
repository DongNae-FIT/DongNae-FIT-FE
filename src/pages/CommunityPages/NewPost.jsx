import styles from "@/pages/CommunityPages/NewPost.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NewPost = () => {
  const { t } = useTranslation();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  return (
    <div className={styles["new-post"]}>
      <input
        type="text"
        className={styles["new-post__title"]}
        placeholder={t("community.title_placeholder")}
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <textarea
        className={styles["new-post__content"]}
        placeholder={t("community.content_placeholder")}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <img
        src={"/icon/icon_img_grey.png"}
        className={styles["img-icon"]}
        onClick={() => {}}
      />
    </div>
  );
};

export default NewPost;
