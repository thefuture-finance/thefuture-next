import { getCoinData } from "@/server/action";
import ExploreTable from "./ExploreTable";

export default async function ExploreTableSuspensed() {
  const coinData = await getCoinData();

  return <ExploreTable initialData={coinData} />;
}
