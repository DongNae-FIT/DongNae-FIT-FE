import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/CommunityPages/NewPost.module.css";
import EditorHeader from "@/layouts/Header/EditorHeader";
import useCommunity from "@/hooks/useCommunity";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { t } = useTranslation();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { saveNewPost, saveNewPostImg, postId } = useCommunity();
  const navigate = useNavigate();

  const postImg = useRef(null); // useRef로 변경
  const [previewImg, setPreviewImg] = useState([]);

  const onDoneClick = async () => {
    try {
      const isPostSubmited = postImg.current?.files[0] !== undefined;
      const formData = new FormData();

      if (isPostSubmited) {
        formData.append("postImage", postImg.current.files[0]);
      }

      const pId = await saveNewPost(
        isPostSubmited,
        postTitle,
        postContent,
        isPostSubmited && formData
      );

      console.log(pId);
      if (pId) {
        navigate(`/community/post/${pId}`, { state: { fromNew: true } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useState(() => {
  //   if (postId) {
  //     navigate(`/community/post/${postId}`, { state: { fromNew: true } });
  //   }
  // }, [postId]);

  const handleImgUpload = () => {
    postImg.current?.click();
  };

  const handlePreview = () => {
    if (postImg.current?.files != null)
      setPreviewImg(URL.createObjectURL(postImg.current?.files[0]));
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
        <div className={styles["image-section"]}>
          <div className={styles["image-submit"]}>
            <input
              accept="image/*"
              onChange={handlePreview}
              ref={postImg}
              type="file"
              className={styles["img-input"]}
            />
            <img
              src={"/icon/icon_img_grey.png"}
              className={styles["img-icon"]}
              onClick={handleImgUpload}
            />
          </div>
          {postImg.current?.files[0] !== undefined && (
            <img src={previewImg} className={styles["preview-img"]} />
          )}
        </div>
      </div>
    </>
  );
};

export default NewPost;
