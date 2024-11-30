import { useTranslation } from "react-i18next";

import styles from "@/pages/GymPages/GymDetail.module.css";

const GymDetail = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["gym-detail"]}>
      <div className={styles["map"]}>지도</div>

      <div className={styles["wrapper"]}>
        <div className={styles["info"]}>시설 상세 정보</div>
      </div>
    </div>
  );
};

export default GymDetail;
