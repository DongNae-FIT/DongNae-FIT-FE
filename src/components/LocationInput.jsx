import DaumPostcode from "react-daum-postcode";

const LocationInput = ({ onSelectAddress }) => {
  const handleComplete = (data) => {
    onSelectAddress(data.address);
  };

  const style = {
    position: "fixed",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "30",
    width: "100vw",
    height: "100vh",
    maxWidth: "1024px",
  };

  return <DaumPostcode onComplete={handleComplete} style={style} />;
};

export default LocationInput;
