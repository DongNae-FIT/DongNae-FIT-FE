import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/CommunityPages/CommunityMain.module.css";
import CommunityItem from "@/components/Community/CommunityItem";

const CommunityMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles["community-main"]}>
      <div className={styles["post-list"]}>
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
        />
        <CommunityItem
          title={"게시글 제목입니다. 이런식으로 보여요. 넘치면 어떻게 될까요?"}
          content={
            "게시글 내용입니다. 이런식으로 보이면 좋을 것 같아요. 일단 아무말이나 적어보겠습니다. 잘 보일까요? 잘 보였으면 좋겠네요."
          }
          imgSrc="/example.jpg"
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
