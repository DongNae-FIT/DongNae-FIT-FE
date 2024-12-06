import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/CommunityPages/CommunityMain.module.css";
import CommunityItem from "@/components/Community/CommunityItem";
import { useEffect } from "react";
import useCommunity from "@/hooks/useCommunity";
import useAuth from "@/hooks/useAuth";

const CommunityMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entirePostList, getEntirePostList, loading, error } = useCommunity();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntirePostList(); // 태그 가져오기
      } catch (err) {
        console.error("Failed to fetch entrie post:", err); // 태그 가져오기 실패 시 에러 로그
      }
    };
    initialize(); // 초기화 함수 실행
  }, []);

  const onWriteClicked = () => {
    navigate("/community/new/post");
  };

  return (
    <div className={styles["community-main"]}>
      <div className={styles["post-list"]}>
        {entirePostList.map((post) => (
          <CommunityItem
            key={post.postId}
            postId={post.postId}
            title={post.postTitle}
            content={post.postDetail}
            imgSrc={post.postImage}
            date="2024-10-11 11:11:11"
            likeCount={post.postLikeCount}
            saveCount={post.postSaveCount}
            //  postId,  title,  content,  imgSrc,  date,  likeCount,  saveCount,
            //postId, postTitle, postDetail, postImage, postLikeCount, postSaveCount
          />
        ))}
      </div>
      <button className={styles["write-button"]} onClick={onWriteClicked}>
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write-icon"]}
        />
        {t("community.write")}
      </button>
    </div>
  );
};

export default CommunityMain;
