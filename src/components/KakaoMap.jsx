import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ locations, mapHeight }) => {
  const center =
    locations.length > 0
      ? { lat: locations[0].lat, lng: locations[0].lng }
      : { lat: 37.552635722509, lng: 126.92436042413 }; // 기본 중심 좌표 (홍익대)

  return (
    <div>
      <Map
        center={center}
        style={{
          width: "100%",
          height: `${mapHeight}px`,
          minHeight: "40vh",
        }}
        level={9}
      >
        {locations.map((location) => (
          <MapMarker
            key={location.name}
            position={{ lat: location.lat, lng: location.lng }}
          ></MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default KakaoMap;
