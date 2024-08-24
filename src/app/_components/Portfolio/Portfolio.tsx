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

  const price = 12312312312;

  return (
    <>
      <div className="flex justify-center w-full text-[#F9F9F9]">
        <span> {address} | &nbsp;</span>
        <span className="font-bold">${price.toLocaleString("en-GB")}</span>
      </div>
      <PortfolioTable initialData={portfolioData} address={address} />
    </>
  );
}
