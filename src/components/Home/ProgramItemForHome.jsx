import { useNavigate } from "react-router-dom";

import styles from "@/components/Home/ProgramItemForHome.module.css";

const ProgramItemForHome = ({ programId, imgSrc, name, facility, price }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["program-item"]}
      onClick={() => {
        navigate(`/program/${programId}`);
      }}
    >
      <img src={imgSrc} className={styles["program-img"]} />
      <div className={styles["text-wrapper"]}>
        <div className={styles["name"]}>{name}</div>
        <div className={styles["facility"]}>{facility}</div>
        <div className={styles["price"]}>{price}</div>
      </div>
    </div>
  );
};

export default ProgramItemForHome;
