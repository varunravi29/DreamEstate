import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";

function Map({ item }) {
  // Check if item exists and has valid length
  const hasValidItems = item && item.length > 0 && item[0]?.longitude !== undefined && item[0]?.latitude !== undefined;

  return (
    <MapContainer
      className="h-[100vh] rounded-xl"
      center={hasValidItems ? [item[0]?.latitude, item[0]?.longitude] : [51.505, -0.09]}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Use optional chaining (?.) to prevent accessing undefined items */}
      {item?.map((itm) => (
        itm.longitude !== undefined && itm.latitude !== undefined && <Pin key={itm.id} item={itm} />
      ))}
    </MapContainer>
  );
}

export default Map;
