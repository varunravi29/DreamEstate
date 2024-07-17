import Map from "../../Components/Map/Map";
import Slider from "../../Components/Slider/Slider";
// import { singlePostData, userData } from "../../Lib/DummyData";
import { useLoaderData } from "react-router-dom";

function SinglePage() {
  const post = useLoaderData();
  console.log(post);

  const sections = [
    {
      title: "Utilities",
      imageSrc: "/utility.png",
      description: post.posts.postDetail.utilities,
    },
    {
      title: "Pet Policy",
      imageSrc: "/pet.png",
      description: post.posts.postDetail.pet,
    },
    {
      title: "Property Fees",
      imageSrc: "/fee.png",
      description: post.posts.postDetail.income,
    },
  ];

  return (
    <div className="w-full h-full md:flex overflow-auto ">
      <div className="w-full md:w-3/5 h-fit md:h-full flex flex-col justify-start items-center mb-[150px]">
        <div className="w-full h-[50%]">
          <Slider images={post.posts.images} />
        </div>
        <div className="w-full md:h-60 h-fit mt-10">
          <div className="w-full h-1/2 flex">
            <div className="w-[60%] md:w-[70%] h-full py-2 px-3">
              <div className="w-full h-1/3">
                <h1 className="font-semibold text-lg text-slate-800 tracking-tight">
                  {post.posts.title}
                </h1>
              </div>
              <div className="w-full h-1/3 flex gap-1">
                <img className="w-4 h-4" src="/pin.png" alt="location pin" />
                <h1 className="font-bold text-xs text-black tracking-tight">
                  {post.posts.address}
                </h1>
              </div>
              <div className="w-full h-1/3">
                <h1 className="w-40 text-center py-1 rounded-md bg-yellow-200">
                  Rs. {post.posts.price}
                </h1>/
              </div>
            </div>
            <div className="w-[40%] md:w-[30%] h-full rounded-md mr-9 bg-yellow-200 flex flex-col justify-center items-center">
              <img
                className="w-12 h-12 rounded-full border border-slate-900"
                src={
                  post.posts.user.avatar ||
                  "https://cdn0.iconfinder.com/data/icons/instagram-ui-button/32/instagram_ui_icon_account-512.png"
                }
              />
              <h1 className="text-sm font-semibold mt-1">
                {post.posts.user.username}
              </h1>
            </div>
          </div>
          <div className="w-full h-1/2 p-2 md:mb-[50px] mb-10">
            <p className="font-semibold text-slate-500 text-sm">
              {post.posts.postDetail.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-2 md:p-0 md:w-2/5 h-full rounded-md">
        <div className="w-full h-52">
          <h1 className="px-2 py-1 font-semibold tracking-tight">General</h1>
          <div className="w-full h-fit flex flex-col pb-2 bg-slate-100 border border-slate-300 rounded-lg">
            {sections.map((section, index) => (
              <div key={index} className="w-full h-1/2 flex">
                <div className="w-[10%] h-full pl-5 mt-3 flex justify-center items-center">
                  <img
                    className="w-5 h-5"
                    src={
                      section.imageSrc
                        ? section.imageSrc
                        : "https://cdn0.iconfinder.com/data/icons/instagram-ui-button/32/instagram_ui_icon_account-512.png"
                    }
                    alt={section.title}
                  />
                </div>
                <div className="w-[90%] h-full">
                  <h1 className="font-bold text-sm mt-2">{section.title}</h1>
                  <p className="font-bold text-sm text-slate-700">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-24 md:pl-2 mt-5">
          <div className="w-full h-1/2">
            <h1 className="font-semibold">Nearby Places</h1>
          </div>
          <div className="w-full h-1/2 bg-slate-100 border border-slate-300 pt-2 rounded-md flex justify-evenly items-center">
            <div className="w-1/3 h-full flex">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img className="w-5" src="/school.png" alt="school" />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start">
                <h1 className="font-bold text-slate-800 text-sm">School</h1>
                <h1 className="font-semibold text-slate-600 text-xs">
                  {post.posts.postDetail.school}
                </h1>
              </div>
            </div>
            <div className="w-1/3 h-full flex">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img className="w-5" src="/bus.png" alt="bus stop" />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start">
                <h1 className="font-bold text-slate-800 text-sm">Bus Stop</h1>
                <h1 className="font-semibold text-slate-600 text-xs">
                  {post.posts.postDetail.bus}
                </h1>
              </div>
            </div>
            <div className="w-1/3 h-full flex">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img className="w-5" src="/restaurant.png" alt="restaurant" />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start">
                <h1 className="font-bold text-slate-800 text-sm">Restaurant</h1>
                <h1 className="font-semibold text-slate-600 text-xs">
                  {post.posts.postDetail.restaurant}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-24 md:pl-2 mt-5">
          <div className="w-full h-1/2">
            <h1 className="font-semibold">Room Sizes</h1>
          </div>
          <div className="w-full h-1/2 bg-slate-100 border border-slate-300 pt-2 rounded-md flex justify-evenly items-center">
            <div className="w-1/3 h-full flex">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img className="w-5" src="/size.png" alt="size" />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start">
                <h1 className="font-bold text-slate-800 text-sm">
                  {post.posts.postDetail.size}
                </h1>
                <h1 className="font-semibold text-slate-600 text-xs">(SQft)</h1>
              </div>
            </div>
            <div className="w-1/3 h-full flex">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img className="w-5" src="/bed.png" alt="bedrooms" />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start">
                <h1 className="font-bold text-slate-800 text-sm">
                  {post.posts.bedroom}
                </h1>
                <h1 className="font-semibold text-slate-600 text-xs">
                  Bedroom
                </h1>
              </div>
            </div>
            <div className="w-1/3 h-full flex">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img className="w-5" src="/bath.png" alt="bathrooms" />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start">
                <h1 className="font-bold text-slate-800 text-sm">
                  {post.posts.bathroom}
                </h1>
                <h1 className="font-semibold text-slate-600 text-xs">
                  Bathroom
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-44 md:pl-2 mt-5">
          <h1 className=" font-bold">Location</h1>
          <div className="w-full h-full pt-2">
            <Map item={[post.posts]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
