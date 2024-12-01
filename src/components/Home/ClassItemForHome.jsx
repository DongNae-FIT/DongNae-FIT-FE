import { useNavigate } from "react-router-dom";

import styles from "@/components/Home/ClassItemForHome.module.css";

const ClassItemForHome = ({ name, facility, price }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["class-item"]}
      onClick={() => {
        navigate("/class/detail");
      }}
    >
      <img src={"/example.jpg"} className={styles["class-img"]} />
      <div className={styles["text-wrapper"]}>
        <div className={styles["name"]}>{name}</div>
        <div className={styles["facility"]}>{facility}</div>
        <div className={styles["price"]}>{price}</div>
      </div>
    </div>
  );
};

export default ClassItemForHome;
