import { SelectAccountDropdownButton } from "./PortfolioSelectAccountDropdown";

export default function PortfolioTopBard({ address }: { address: string }) {
  return (
    <>
      <div className="w-full h-32 flex justify-between">
        <div className="flex">Name</div>
        <div>{}</div>

        <div className="">
          <SelectAccountDropdownButton selectedAddress={address} />
        </div>
      </div>
    </>
  );
}
