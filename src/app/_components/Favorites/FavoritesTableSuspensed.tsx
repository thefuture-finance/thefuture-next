import { getCoinData } from "@/server/action";
import FavoritesTable from "./FavoritesTable";

export default async function FavoritesTableSuspensed() {
  const coinData = await getCoinData();

  return <FavoritesTable initialData={coinData} />;
}
