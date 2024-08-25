import { Suspense } from "react";
import FavoritesTableLoading from "../_components/Favorites/FavoritesTableLoading";
import FavoritesTableSuspensed from "../_components/Favorites/FavoritesTableSuspensed";

export default async function Explore() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
        <div className="w-[1200px] h-full mt-8 shadow">
          <Suspense fallback={<FavoritesTableLoading />}>
            <FavoritesTableSuspensed />
          </Suspense>
        </div>
      </div>
    </>
  );
}
