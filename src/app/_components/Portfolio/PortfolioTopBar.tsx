import { SelectAccountDropdownButton } from "./PortfolioSelectAccountDropdown";

export default function PortfolioTopBard({ address }: { address: string }) {
  return (
    <div className="w-full border-0 flex justify-center mt-[3rem]">
      <SelectAccountDropdownButton selectedAddress={address} />
    </div>
  );
}
