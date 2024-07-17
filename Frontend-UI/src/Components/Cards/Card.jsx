import { Link } from "react-router-dom";

function Card({ item }) {
  if (!item || Object.keys(item).length === 0) {
    return <div>No Item</div>;
  }
  return (
    <div className="w-[95%] h-auto mt-5 mb-5 flex flex-col md:flex-row justify-center items-center gap-3">
      <div className="w-full md:w-2/5 h-48 bg-slate-800 rounded-lg shadow-lg">
        <Link to={`/${item.id}`}>
          <img
            src={
              item.images[0]
                ? item.images[0]
                : "https://t3.ftcdn.net/jpg/03/56/46/10/360_F_356461066_rUflx03xPKYXEGe36Ecslg2ilEnWsAHa.jpg"
            }
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      </div>
      <div className="w-full md:w-3/5 h-auto md:mt-0">
        <div className="w-full h-auto mb-2 pt-1 pl-2 flex justify-start items-start">
          <h1 className="font-semibold text-slate-900">{item.title}</h1>
        </div>
        <div className="w-full h-auto pl-2 flex mb-2 justify-start items-center">
          <img className="w-4" src="/pin.png" alt="" />
          <h1 className="pl-1 text-sm font-semibold text-slate-700">
            {item.address}
          </h1>
        </div>
        <div className="w-full pl-2 h-auto mb-4 flex justify-start items-center">
          <h1 className="bg-yellow-200 py-0.5 px-1 rounded-sm">
            Rs. {item.price}
          </h1>
        </div>
        <div className="w-full h-auto flex justify-between items-center pl-2">
          <div className="w-[40%] h-full flex">
            <h1 className="text-sm font-semibold text-slate-500 ">
              <span className="bg-slate-200 px-2 py-1 rounded-full border border-slate-300">
                {item.bedroom}
              </span>{" "}
              Bedroom
            </h1>
          </div>
          <div className="w-[40%] h-full">
            <h1 className="text-sm font-semibold text-slate-500 ">
              <span className="bg-slate-200 px-2 py-1 rounded-full border border-slate-300">
                {item.bathroom}
              </span>{" "}
              Bathroom
            </h1>
          </div>

          <div className="w-[10%] h-full rounded-full">
            <img className="w-4 h-4 cursor-pointer" src="/save.png" alt="" />
          </div>
          <div className="w-[10%] h-full">
            <img className="w-4 h-4 cursor-pointer" src="/chat.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
