import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="w-full h-full bg-white">
          <img src={item.img} alt="" />
          <Link to={`/${item.id}`}>
            <h2>{item.title}</h2>
          </Link>
          <p className="font-semibold ">Rs.{item.price}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
