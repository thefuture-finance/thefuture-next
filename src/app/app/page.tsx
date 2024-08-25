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
        <div className="h-full w-full">
          <AppFrame appUrl={searchParams.appUrl} allowedFeaturesList={""} />
        </div>
      </div>
    </>
  );
}
