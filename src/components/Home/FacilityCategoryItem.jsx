import { useTranslation } from "react-i18next";

import styles from "@/components/Home/FacilityCategoryItem.module.css";
import { useNavigate } from "react-router-dom";

const FacilityCategoryItem = ({ categoryId, name }) => {
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
      <img
        src={`facility/category${categoryId}.png`}
        className={styles["category-img"]}
      />
      <div className={styles["name"]}>{name}</div>
    </div>
  );
};

export default FacilityCategoryItem;
