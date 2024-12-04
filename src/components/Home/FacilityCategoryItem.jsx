import { useTranslation } from "react-i18next";

import styles from "@/components/Home/FacilityCategoryItem.module.css";
import { useNavigate } from "react-router-dom";

const FacilityCategoryItem = ({
  categoryId,
  name,
  imgSrc = "/example.jpg",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className={styles["facility-category-item"]}
      onClick={() => {
        navigate("/facility", {
          state: {
            category: categoryId,
          },
        });
      }}
    >
      {imgSrc ? <img src={imgSrc} className={styles["category-img"]} /> : ""}
      <div className={styles["name"]}>{name}</div>
    </div>
  );
};

export default FacilityCategoryItem;
