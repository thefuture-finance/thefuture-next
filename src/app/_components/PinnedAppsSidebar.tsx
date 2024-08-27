"use client";

import { usePinnedApps } from "@/store/usePinnedApps";
import Link from "next/link";
import Image from "next/image";
import { AppCardData } from "./apps/AppCard";
import { useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

export default function PinnedAppsSidebar() {
  const searchParams = useSearchParams();

  const apps = trpc.appsRouter.getApps.useQuery<AppCardData[]>();

  const { pinnedApps } = usePinnedApps();

  return (
    <>
      {apps.data
        ?.filter((app) => pinnedApps.includes(app.appUrl))
        .map((app) => (
          <Link
            key={app.name}
            href={`/app/?appUrl=${app.appUrl}`}
            className={
              "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
              (app.appUrl == searchParams.get("appUrl")
                ? "bg-[rgba(50,50,50)]"
                : "")
            }
          >
            <Image
              alt={app.name}
              src={app.logo}
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading-[24px] font-light ml-2">
              {app.name}
            </span>
          </Link>
        ))}
    </>
  );
}
