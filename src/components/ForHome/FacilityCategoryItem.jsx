import { useTranslation } from "react-i18next";

import styles from "@/components/ForHome/FacilityCategoryItem.module.css";

const FacilityCategoryItem = ({ name, imgSrc = "/example.jpg" }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["facility-category-item"]}>
      {imgSrc ? <img src={imgSrc} className={styles["category-img"]} /> : ""}
      <div className={styles["name"]}>{name}</div>
    </div>
  );
};

export default FacilityCategoryItem;
