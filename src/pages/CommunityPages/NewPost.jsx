import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/CommunityPages/NewPost.module.css";
import EditorHeader from "@/layouts/Header/EditorHeader";
import useCommunity from "@/hooks/useCommunity";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { t } = useTranslation();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { saveNewPost, postId } = useCommunity();
  const navigate = useNavigate();

  const onDoneClick = async () => {
    try {
      console.log("페이지에서 요청");
      await saveNewPost(postTitle, postContent);
      navigate(`/community/post/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <EditorHeader title={t("community.write")} onClick={onDoneClick} />
      <div className={styles["new-post"]}>
        <input
          type="text"
          className={styles["title"]}
          placeholder={t("community.title_placeholder")}
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea
          className={styles["content"]}
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
    </>
  );
};

export default NewPost;
