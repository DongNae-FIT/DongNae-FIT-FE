import React from "react";
import styles from "@/utils/Loading.module.css";

const Loading = () => {
  return (
    <div className="loading">
      <img className={styles["spinner"]} src={"/spinner.gif"} alt="로딩" />
    </div>
  );
};

export default Loading; // Loading 컴포넌트 내보내기
