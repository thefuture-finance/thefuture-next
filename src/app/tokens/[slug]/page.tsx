import TokenInfo from "@/app/_components/token/TokenInfo";
import TokenStats from "@/app/_components/token/TokenStats";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { CoinInfo, getCoinDataById } from "@/server/action";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicTokenChart = dynamic(
  () => import("@/app/_components/token/TokenChart"),
  {
    ssr: false,
  },
);

export default async function Token({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="flex flex-col gap-4 justify-start items-center mt-8">
        <DynamicTokenChart coinId={params.slug} />
        <Suspense fallback={<Skeleton className="w-[600px] h-32" />}>
          <TokenInfo id={params.slug} />
        </Suspense>
        <Suspense></Suspense>
      </div>
    </>
  );
}
