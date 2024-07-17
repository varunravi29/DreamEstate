import SearchBar from "../../Components/SearchBar/SearchBar";

function Homepage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Text-Container */}
      <div className="md:w-8/12 w-full h-full flex flex-col justify-start md:mt-40 items-center">
        <h1 className="md:pl-10 md:pr-10 text-3xl text-center md:text-left mt-10 md:mt-0 md:text-5xl font-semibold text-slate-900 text-wrap">
          Find Real Estate & Get Your Dream Place
        </h1>
        <p className="md:pl-10 md:pr-10 pl-5 pr-5 mt-2 text-wrap text-center md:text-left font-semibold text-slate-700 text-xs">
          Find your dream property effortlessly with our app. Browse listings,
          compare prices, and schedule viewings. Get personalized
          recommendations and secure your ideal home with ease. Start your
          journey to home ownership today!
        </p>
        <div className="w-full h-fit pl-10 pr-10 mt-10 mb-10">
          <SearchBar />
        </div>
        <div className="w-full h-20 text-slate-800 flex justify-between items-center pl-10 pr-10">
          <div>
            <h1 className="font-bold text-xl -tracking-tighter text-black">
              16+
            </h1>
            <h1 className="text-sm font-bold">Years of Experience</h1>
          </div>
          <div>
            <h1 className="font-bold text-xl -tracking-tighter text-black">
              200
            </h1>
            <h1 className="text-sm font-bold">Award Gained</h1>
          </div>
          <div>
            <h1 className="font-bold text-xl -tracking-tighter text-black">
              1200+
            </h1>
            <h1 className="text-sm font-bold">Properly Ready</h1>
          </div>
        </div>
      </div>
      {/* Text-Container */}
      {/* Image-Container */}
      <div className="md:w-4/12 h-full relative flex items-center bg-[#fcf5f3] overflow-visible">
        <img
          className="absolute -top-10 -left-10 overflow-visible"
          src="/bg.png"
          alt=""
        />
      </div>
      {/* Image-Container */}
    </div>
  );
}

export default Homepage;
