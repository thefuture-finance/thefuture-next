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
          className="absolute top-6 left-6 cursor-pointer hover:bg-green-300 bg-[#343434] rounded-2xl p-4"
        >
          back
        </Link>
        <div className="h-full w-full">
          <AppFrame appUrl={searchParams.appUrl} allowedFeaturesList={""} />
        </div>
      </div>
    </>
  );
}
