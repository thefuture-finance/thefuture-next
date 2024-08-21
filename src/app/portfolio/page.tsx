import { getPortfolioData } from "@/server/action";
import { PortfolioTable } from "@/app/_components/Portfolio/PortfolioTable";
import PortfolioTopBard from "@/app/_components/Portfolio/PortfolioTopBar";
import { isValidEthereumAddress } from "@/utils/regex";
import { useSpinnerStore } from "../../store/spinner";

export default async function Portfolio({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  if (!isValidEthereumAddress(searchParams.address || "")) {
    return (
      <>
        <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
          <div className="w-[1200px] h-full">
            <PortfolioTopBard address={""} />
            <div className="flex justify-center w-full">
              Select a valid Address
            </div>
          </div>
        </div>
      </>
    );
  }

  const portfolioData = await getPortfolioData(searchParams.address);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
        <div className="w-[1200px] h-full">
          <PortfolioTopBard address={searchParams.address} />
          <PortfolioTable
            initialData={portfolioData}
            address={searchParams.address}
          />
        </div>
      </div>
    </>
  );
}
