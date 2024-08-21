import { getCoinData } from "@/server/action";
import ExploreTable from "@/app/_components/Explore/ExploreTable";

export default async function Explore() {
  const coinData = await getCoinData();

  return (
    <>
      <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
        <div className="w-[1200px] h-full">
          <ExploreTable initialData={coinData} />
        </div>
      </div>
    </>
  );
}
