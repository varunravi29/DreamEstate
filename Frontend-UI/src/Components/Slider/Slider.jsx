import { useState } from "react";

function Slider({ images }) {
  const [ImageIndex, setImageIndex] = useState(null);
  return (
    <div className="w-[100%] h-[270px] gap-[20px] mb-10 flex justify-start items-start">
      {ImageIndex !== null && (
        <div className="absolute w-[100vw] h-[100vh] justify-between items-center top-0 left-0 bg-black flex">
          <div className="flex-1 w-[10%]">
            <img
              onClick={() => {
                if (ImageIndex > 0) {
                  setImageIndex(
                    (ImageIndex - 1 + images.length) % images.length
                  );
                }
              }}
              className="w-[20%] h-[10%] object-cover hover:text-slate-500 hover:scale-90 duration-300"
              src="/arrow.png"
              alt=""
            />
          </div>
          <div className="flex-10 w-[80%] h-[30%] md:h-full flex justify-center items-center">
            <img
              className="w-[80%] h-[80%] rounded-lg object-cover"
              src={images[ImageIndex]}
              alt=""
            />
          </div>
          <div className="flex-1 flex justify-end items-center">
            <img
              onClick={() => {
                if (ImageIndex < images.length - 1) {
                  setImageIndex(ImageIndex + 1);
                }
              }}
              className="w-[20%] h-[100%] object-cover rotate-180 hover:text-slate-500 hover:scale-90 duration-300"
              src="/arrow.png"
              alt=""
            />
          </div>
          <div
            onClick={() => setImageIndex(null)}
            className=" absolute top-0 right-0 mr-5 mt-5 text-3xl text-slate-200 cursor-pointer hover:text-slate-500 hover:scale-90 duration-300"
          >
            x
          </div>
        </div>
      )}
      <div className="w-full h-full flex flex-col justify-start md:items-start">
        <div className="w-full md:w-3/5 h-fit p-2">
          <img
            onClick={() => setImageIndex(0)}
            className="rounded-md"
            src={images[0]}
            alt="main"
          />
        </div>
        <div className="w-full md:w-2/5 h-full p-2 flex md:justify-start items-center gap-2">
          {["image2", "image3", "image4"].map((alt, index) => (
            <div key={index} className="w-fit h-[120px]">
              <img
                className="h-10 w-full rounded-md"
                onClick={() => setImageIndex(index)}
                src={images[index]}
                alt={alt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
