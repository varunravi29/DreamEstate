import { Await, useLoaderData } from "react-router-dom";
import Card from "../../Components/Cards/Card";
import Filter from "../../Components/Filter/Filter";
import Map from "../../Components/Map/Map";
import { Suspense } from "react";

function ListPage() {
  const { postResponse } = useLoaderData();

  return (
    <div className="w-full h-full md:flex pl-10 pr-10 overflow-auto">
      <div className="w-full md:w-3/5 h-full">
        <Filter />
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={postResponse}
            errorElement={<p>Error loading package location!</p>}
          >
            {(resolvedPostResponse) => (
              <>
                {resolvedPostResponse.posts.map(post => (
                  <Card key={post.id} item={post} />
                ))}
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <div className="w-full md:w-2/5 h-full flex justify-center items-center">
        <div className="w-[98%] h-[98%] bg-slate-100 rounded-xl">
          <Suspense fallback={<p>Loading Map...</p>}>
            <Await
              resolve={postResponse}
              errorElement={<p>Error loading map!</p>}
            >
              {(resolvedPostResponse) => (
                <Map items={resolvedPostResponse.posts} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
