"use client";

import { usePinnedApps } from "@/store/usePinnedApps";
import Link from "next/link";
import Image from "next/image";
import { AppCardData } from "./apps/AppCard";
import { useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { cn } from "@/lib/utils";

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
            className={cn(
              "flex p-2 group-hover:pl-3 rounded-lg w-full items-center group-hover:w-full hover:bg-[rgba(60,60,60)]",
              {
                "bg-[rgba(50,50,50)]": app.appUrl == searchParams.get("appUrl"),
              },
            )}
          >
            <Image
              alt={app.name}
              src={app.logo}
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[16px] leading-[20px] font-light ml-2 hidden group-hover:flex typing-demo w-[13.3ch]">
              {app.name}
            </span>
          </Link>
        ))}
    </>
  );
}
