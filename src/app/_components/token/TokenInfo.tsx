import { CoinInfo, getCoinDataById } from "@/server/action";
import TokenStats from "./TokenStats";

export default async function TokenInfo({ id }: { id: string }) {
  const value: CoinInfo = (await getCoinDataById(`${id}`)) ?? {};
  return (
    <TokenStats
      hour24={value.hour24}
      day30={value.day30}
      day60={value.day60}
      year1={value.year1}
      marketcap={value.marketcap}
      fullydiluted={value.fullydiluted}
    />
  );
}
