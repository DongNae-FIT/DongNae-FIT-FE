import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ locations }) => {
  const center =
    locations.length > 0
      ? { lat: locations[0].lat, lng: locations[0].lng }
      : { lat: 37.552635722509, lng: 126.92436042413 }; // 기본 중심 좌표 (홍익대)

  return (
    <div>
      <Map center={center} style={{ width: "100%", height: "300px" }} level={3}>
        {locations.map((location, index) => (
          <MapMarker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
          ></MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default KakaoMap;
