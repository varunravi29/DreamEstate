import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="w-full h-36 mt-2 flex flex-col justify-start items-start">
      <h1 className="font-semibold text-slate-500 -tracking-tighter">
        Search Results for{" "}
        <span className="font-semibold mt-2 text-md text-black -tracking-tighter">
          {searchParams.get("city")}
        </span>
      </h1>
      <input
        className="pl-2 text-sm w-[50%] rounded-sm h-8 border"
        type="text"
        placeholder="Location"
        name="city"
        onChange={handleChange}
        defaultValue={query.city}
      />
      <div className="w-full h-20">
        <div className="w-full h-1/2 pl-2 pr-2 font-semibold text-slate-800 gap-2 text-xs flex justify-start items-end">
          <h1 className="w-[16%]">Type</h1>
          <h1 className="w-[16%]">Property</h1>
          <h1 className="w-[16%]">Min Price</h1>
          <h1 className="w-[16%]">Max Price</h1>
          <h1 className="w-[16%]">Bedroom</h1>
        </div>
        <div className="w-full h-1/2 border rounded-sm flex justify-start items-center gap-2 pl-2 pr-2">
          <select
            className="w-[16%] border border-slate-500 rounded-sm text-sm pl-2 h-[70%]"
            name="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value=""></option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <select
            className="w-[16%] border border-slate-500 rounded-sm text-sm pl-2 h-[70%]"
            name="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value=""></option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>

          <input
            className="w-[16%] border border-slate-500 rounded-sm text-xs md:text-sm pl-2 h-[70%]"
            placeholder="any"
            id="minPrice"
            name="minPrice"
            type="number"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
          <input
            className="w-[16%] border border-slate-500 rounded-sm text-xs md:text-sm pl-2 h-[70%]"
            placeholder="any"
            id="maxPrice"
            name="maxPrice"
            type="number"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
          <input
            className="w-[16%] border border-slate-500 rounded-sm text-sm pl-2 h-[70%]"
            placeholder="any"
            type="text"
            onChange={handleChange}
            id="bedroom"
            name="bedroom"
            defaultValue={query.bedroom}
          />
          <button
            onClick={handleFilter}
            className="bg-yellow-300 rounded-full hover:scale-90 duration-300"
          >
            <img className="w-7 p-1" src="/search.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
