import { useTranslation } from "react-i18next";

import styles from "@/components/Class/ClassReviewItem.module.css";

const ClassReviewItem = ({ instructor, period, content }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["class-review-item"]}>
      <div className={styles["info-wrapper"]}>
        <div className={styles["text-wrapper"]}>
          <div className={styles["attribute"]}>{t("class.instructor")}</div>
          <div className={styles["instructor"]}>{instructor}</div>
        </div>
        <div className={styles["text-wrapper"]}>
          <div className={styles["attribute"]}>{t("class.period")}</div>
          <div className={styles["period"]}>{period}</div>
        </div>
      </div>
      <div className={styles["content"]}>{content}</div>
    </div>
  );
};

export default ClassReviewItem;
