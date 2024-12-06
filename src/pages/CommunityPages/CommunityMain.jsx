import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/CommunityPages/CommunityMain.module.css";
import CommunityItem from "@/components/Community/CommunityItem";
import { useEffect } from "react";
import useCommunity from "@/hooks/useCommunity";

const CommunityMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entirePostList, getEntirePostList, loading, error } = useCommunity();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntirePostList(); // 태그 가져오기
        console.log(entirePostList);
      } catch (err) {
        console.error("Failed to fetch entrie post:", err); // 태그 가져오기 실패 시 에러 로그
      }
    };
    initialize(); // 초기화 함수 실행
  }, []);

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
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
          date="2024-10-11 11:11:11"
          likeCount={3}
          saveCount={1}
        />
      </div>
      <button
        className={styles["write-button"]}
        onClick={() => {
          navigate("/community/post/new");
        }}
      >
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
