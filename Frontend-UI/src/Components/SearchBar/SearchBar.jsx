import { useState } from "react";
import { Link } from "react-router-dom";

// const types = ["buy", "rent"];
function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = async (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-full h-full">
          <button
            onClick={() => switchType("buy")}
            className={` rounded-tl-sm border w-16 h-8 border-black ${query.type === "buy" ? "bg-black text-white" : ""}`}
          >
            Buy
          </button>
          <button
            onClick={() => switchType("rent")}
            className={`rounded-tr-sm border w-16 h-8 border-black ${query.type === "rent" ? "bg-black text-white" : ""}`}
          >
            Rent
          </button>
        </div>
        <div className="mt-1 w-full h-full flex md:justify-center items-center rounded-sm">
          <form
            className="w-full md:h-10 h-32 flex flex-col md:flex-row justify-start items-center"
            action=""
          >
            <input
              className="w-full md:w-4/12 pl-3 md:mb-0 mb-2 h-full md:rounded-tl-sm md:rounded-bl-sm border md:border-r-black md:border-l-black md:border-t-black md:border-b-black shadow-lg border-slate-500"
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={handleChange}
            />
            <input
              className="w-full md:w-3/12 mb-2 md:mb-0 h-full pl-3 border md:border-r-black md:border-t-black md:border-b-black shadow-lg border-slate-500"
              type="number"
              placeholder="Min Price"
              name="minPrice"
              min={0}
              max={10000000}
              id="Min Price"
              onChange={handleChange}
            />
            <input
              className="w-full md:w-3/12 pl-3 md:rounded-tr-sm md:rounded-br-sm h-full border md:border-r-black md:border-t-black md:border-b-black shadow-lg border-slate-500"
              type="number"
              placeholder="Max Price"
              name="maxPrice"
              min={0}
              max={10000000}
              id="Max Price"
              onChange={handleChange}
            />
            <Link
              to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
            >
              <button className="w-full md:w-1/12 ml-2 mt-2 rounded-full h-full flex justify-center items-center bg-yellow-300">
                <img className="w-5" src="/search.png" alt="" />
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
