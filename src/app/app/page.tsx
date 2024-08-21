import Link from "next/link";
import AppFrame from "@/app/_components/apps/AppFrame";

export default function Apps({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <div className="w-full h-full flex justify-center relative">
        <Link
          href="/apps"
          className="absolute top-[calc(50%-32px)] h-8 left-0 cursor-pointer hover:bg-[#373737] bg-[#222222] rounded-r-2xl p-4 flex justify-center items-center text-[#CDC1B0]"
        >
          Go Back
        </Link>
        <div className="h-full w-full">
          <AppFrame appUrl={searchParams.appUrl} allowedFeaturesList={""} />
        </div>
      </div>
    </>
  );
}
