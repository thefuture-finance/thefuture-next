import { SelectAccountDropdownButton } from "./PortfolioSelectAccountDropdown";

export default function PortfolioTopBard({ address }: { address: String }) {
  return (
    <>
      <div className="w-full h-32 flex justify-between">
        <div className="flex">Name</div>

        <div className="">
          <SelectAccountDropdownButton address={address} />
        </div>
      </div>
    </>
  );
}
