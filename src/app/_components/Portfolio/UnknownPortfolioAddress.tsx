import { SelectAccountDropdownButton } from "./PortfolioSelectAccountDropdown";

export default function UnknownPortfolioAddress({
  address,
}: {
  address: String;
}) {
  return (
    <>
      <div className="w-full h-32 bg-green-300 flex justify-center">
        <div className="">
          <SelectAccountDropdownButton address={address} />
        </div>
      </div>
    </>
  );
}
