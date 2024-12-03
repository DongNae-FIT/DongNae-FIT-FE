import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/Home.module.css";
import BannerSwiper from "@/components/Home/BannerSwiper";
import ProgramItemForHome from "@/components/Home/ProgramItemForHome";
import FacilityCategoryItem from "@/components/Home/FacilityCategoryItem";
import CommunityItemForHome from "@/components/Home/CommunityItemForHome";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            <ProgramItemForHome
              name={"오전골프05"}
              facility={"강남구스포츠센터"}
              price={"80,000원"}
            />
            <ProgramItemForHome
              name={"오전골프05"}
              facility={"강남구스포츠센터"}
              price={"80,000원"}
            />
            <ProgramItemForHome
              name={"오전골프05"}
              facility={"강남구스포츠센터"}
              price={"80,000원"}
            />
            <ProgramItemForHome
              name={"오전골프05"}
              facility={"강남구스포츠센터"}
              price={"80,000원"}
            />
            <ProgramItemForHome
              name={"오전골프05"}
              facility={"강남구스포츠센터"}
              price={"80,000원"}
            />
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
            {Array.from({ length: 13 }, (_, index) => (
              <FacilityCategoryItem
                key={index}
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
            <CommunityItemForHome
              nickname={"닉네임"}
              title={"제목입니다."}
              content={
                "내용이 일부 보입니다. 이런 식으로 보이고 긴 내용은 잘려서 보일 수 있습니다. 뭐라고 더 써야 할까요?????"
              }
            />
            <CommunityItemForHome
              nickname={"닉네임"}
              title={"제목입니다."}
              content={
                "내용이 일부 보입니다. 이런 식으로 보이고 긴 내용은 잘려서 보일 수 있습니다. 뭐라고 더 써야 할까요?????"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
