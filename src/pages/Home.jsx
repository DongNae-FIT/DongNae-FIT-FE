import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/Home.module.css";
import BannerSwiper from "@/components/Home/BannerSwiper";
import ProgramItemForHome from "@/components/Home/ProgramItemForHome";
import FacilityCategoryItem from "@/components/Home/FacilityCategoryItem";
import CommunityItemForHome from "@/components/Home/CommunityItemForHome";
import useMain from "@/hooks/useMain";
import { useEffect } from "react";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getDataForHome, recommendedProgramList, trendingPostList } =
    useMain();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getDataForHome();
      } catch (err) {
        console.error("Failed to fetch entrie post:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["home"]}>
      <BannerSwiper />
      <div className={styles["home__contents"]}>
        <div className={styles["home__section"]}>
          <div
            className={styles["home__subtitle"]}
            onClick={() => navigate("/program")}
          >
            {t("home.subtitle1")}
            <img
              src={"/icon/icon_right_grey.png"}
              className={styles["home__right-icon"]}
            />
          </div>
          <div className={styles["program-list"]}>
            {recommendedProgramList.length === 0 ? (
              <div className={styles["empty-message"]}>
                추천 스포츠 강좌가 없습니다.
              </div>
            ) : (
              recommendedProgramList.map((program) => (
                <ProgramItemForHome
                  key={program.programId}
                  programId={program.programId}
                  name={program.programName}
                  facility={program.facilityName}
                  price={program.programPrice}
                />
              ))
            )}
          </div>
        </div>
        <div className={styles["home__section"]}>
          <div
            className={styles["home__subtitle"]}
            onClick={() => navigate("/facility")}
          >
            {t("home.subtitle2")}
            <img
              src={"/icon/icon_right_grey.png"}
              className={styles["home__right-icon"]}
            />
          </div>
          <div className={styles["category-list"]}>
            {Array.from({ length: 6 }, (_, index) => (
              <FacilityCategoryItem
                key={index}
                categoryId={index + 1}
                name={t(`facility.category${index + 1}`)}
              />
            ))}
          </div>
        </div>
        <div className={styles["home__section"]}>
          <div
            className={styles["home__subtitle"]}
            onClick={() => navigate("/community")}
          >
            {t("home.subtitle3")}
            <img
              src={"/icon/icon_right_grey.png"}
              className={styles["home__right-icon"]}
            />
          </div>
          <div className={styles["community-list"]}>
            {trendingPostList.length === 0 ? (
              <div className={styles["empty-message"]}>
                실시간 인기글 게시글이 없습니다.
              </div>
            ) : (
              trendingPostList.map((post) => (
                <CommunityItemForHome
                  key={post.postId}
                  postId={post.postId}
                  nickname={"닉네임"}
                  title={post.postTitle}
                  content={post.postDetail}
                  imgSrc={post.postImage}
                  date="2024-10-11 11:11:11"
                  likeCount={post.postLikeCount}
                  saveCount={post.postSaveCount}
                  //  postId,  title,  content,  imgSrc,  date,  likeCount,  saveCount,
                  //postId, postTitle, postDetail, postImage, postLikeCount, postSaveCount
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
