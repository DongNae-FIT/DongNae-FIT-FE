import { useNavigate } from "react-router-dom";

import styles from "@/components/Program/ProgramItem.module.css";

const ProgramItem = ({ name, facility, price }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["program-item"]}
      onClick={() => {
        navigate("/program/detail");
      }}
    >
      <img src={"/example.jpg"} className={styles["program-img"]} />
      <div className={styles["text-wrapper"]}>
        <div className={styles["name"]}>{name}</div>
        <div className={styles["facility"]}>{facility}</div>
        <div className={styles["price"]}>{price}</div>
      </div>
    </div>
  );
};

export default ProgramItem;
