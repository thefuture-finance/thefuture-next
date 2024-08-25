import { getPortfolioData } from "@/server/action";
import PortfolioTable from "./PortfolioTable";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
async function sendEmpty(time: number) {
  await sleep(time);
  return null;
}

export default async function PortfolioS({ address }: { address: string }) {
  const portfolioData = await Promise.race([
    getPortfolioData(address),
    sendEmpty(1000),
  ]);

  return <PortfolioTable initialData={portfolioData} address={address} />;
}
