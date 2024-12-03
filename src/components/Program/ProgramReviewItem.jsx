import { useTranslation } from "react-i18next";

import styles from "@/components/Program/ProgramReviewItem.module.css";

const ProgramReviewItem = ({ instructor, period, content }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["program-review-item"]}>
      <div className={styles["info-wrapper"]}>
        <div className={styles["text-wrapper"]}>
          <div className={styles["attribute"]}>{t("program.instructor")}</div>
          <div className={styles["instructor"]}>{instructor}</div>
        </div>
        <div className={styles["text-wrapper"]}>
          <div className={styles["attribute"]}>{t("program.period")}</div>
          <div className={styles["period"]}>{period}</div>
        </div>
      </div>
      <div className={styles["content"]}>{content}</div>
    </div>
  );
};

export default ProgramReviewItem;
