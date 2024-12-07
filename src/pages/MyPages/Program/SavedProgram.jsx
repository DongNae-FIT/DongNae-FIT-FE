import styles from "@/pages/MyPages/Program/SavedProgram.module.css";
import { useEffect } from "react";
import ProgramItem from "@/components/Program/ProgramItem";
import useMyPage from "@/hooks/useMyPage";
import Loading from "@/utils/Loading";
import { useTranslation } from "react-i18next";

const SavedProgram = () => {
  const { authInfo, getProgramSaved, loading, error } = useMyPage();
  const { t } = useTranslation();

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
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles["program"]}>
      <div className={styles["program-list"]}>
        {authInfo.map((program) => (
          <ProgramItem
            key={program.programId}
            programId={program.programId}
            imgSrc={program.facilityImage}
            name={program.programName}
            facility={program.facilityName}
            price={`₩ ${program.programPrice.toLocaleString()}`}
          />
        ))}

        {authInfo.length === 0 && (
          <div className={styles["empty-message"]}>{t("empty_message")}</div>
        )}
      </div>
    </div>
  );
};

export default SavedProgram;
