import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/Home.module.css";
import BannerSwiper from "@/components/Home/BannerSwiper";
import ProgramItemForHome from "@/components/Home/ProgramItemForHome";
import FacilityCategoryItem from "@/components/Home/FacilityCategoryItem";
import CommunityItemForHome from "@/components/Home/CommunityItemForHome";
import useMain from "@/hooks/useMain";
import { useEffect } from "react";
import { format } from "date-fns";

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

  const formattedDate = (data) => {
    return format(new Date(data), "yy/MM/dd HH:mm");
  };

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
                {t("empty_message")}
              </div>
            ) : (
              recommendedProgramList.map((program) => (
                <ProgramItemForHome
                  key={program.programId}
                  imgSrc={program.facilityImage}
                  programId={program.programId}
                  name={program.programName}
                  facility={program.facilityName}
                  price={`₩ ${program.programPrice.toLocaleString()}`}
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
                {t("empty_message")}
              </div>
            ) : (
              trendingPostList.map((post) => (
                <CommunityItemForHome
                  key={post.postId}
                  postId={post.postId}
                  profileImg={
                    post.memberProfile
                      ? post.memberProfile
                      : "/default/default_profile.png"
                  }
                  nickname={post.memberName}
                  title={post.postTitle}
                  content={post.postDetail}
                  date={formattedDate(post.postDate)}
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
