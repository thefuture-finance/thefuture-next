import PortfolioTopBard from "@/app/_components/Portfolio/PortfolioTopBar";
import { isValidEthereumAddress } from "@/utils/regex";
import UnknownPortfolioAddress from "../_components/Portfolio/UnknownPortfolioAddress";
import { Suspense } from "react";
import PortfolioS from "../_components/Portfolio/Portfolio";
import PortfolioTableSkeleton from "../_components/Portfolio/PortfolioTableSkeleton";

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
            <UnknownPortfolioAddress />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
        <div className="w-[1200px] h-full">
          <PortfolioTopBard address={searchParams.address} />
          <Suspense fallback={<PortfolioTableSkeleton />}>
            <PortfolioS address={searchParams.address} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
