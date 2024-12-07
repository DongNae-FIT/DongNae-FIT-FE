import styles from "@/pages/MyPages/Program/SavedProgram.module.css";
import { useEffect } from "react";
import ProgramItem from "@/components/Program/ProgramItem";
import useMyPage from "@/hooks/useMyPage";

const SavedProgram = () => {
  const { authInfo, getProgramSaved, loading, error } = useMyPage();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getProgramSaved();
      } catch (err) {
        console.error("Failed to fetch saved programs:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !authInfo) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles["saved-program"]}>
      {" "}
      <div className={styles["program-list"]}>
        {authInfo.map((program) => (
          <ProgramItem
            key={program.programId}
            programId={program.programId}
            name={program.programName}
            facility={program.facilityName}
            price={`${program.programPrice.toLocaleString()}원`}
          />
        ))}

        {authInfo.length === 0 ? (
          <div className={styles["empty-message"]}>강좌가 없습니다.</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SavedProgram;
