"use client";

import { usePinnedApps } from "@/store/usePinnedApps";
import Link from "next/link";
import Image from "next/image";
import { AppCardData } from "./apps/AppCard";
import { useSearchParams } from "next/navigation";

export default function PinnedAppsSidebar() {
  const searchParams = useSearchParams();
  const apps: AppCardData[] = [
    {
      networks: ["scroll"],
      category: ["Defi", "Lending/Borrowing"],
      socials: [
        "https://x.com/aaveaave",
        "https://github.com/aave",
        "https://discord.com/invite/CvKUrqM",
      ],
      is_favorites: false,
      appUrl: "https://app.aave.com",
      logo: "/assets/images/aaveLogo.png",
      name: "Aave v3",
      description: "Non-custodial liquidity protocol",
    },
    {
      networks: ["scroll"],
      category: ["Defi", "Staking"],
      socials: [],
      is_favorites: true,
      appUrl: "https://app.uniswap.org",
      logo: "/assets/images/lidoLogo.png",
      name: "Lido Staking",
      description: "Lido is the liquid staking solution for Ethereum.",
    },
    {
      networks: ["scroll", "ethereum"],
      category: ["Bridge"],
      socials: [],
      is_favorites: true,
      appUrl: "https://www.asteriafinance.com",
      logo: "/assets/images/scrollLogo.png",
      name: "Scroll Bridge",
      description: "Scroll Bridge is the native Bridge in Scroll",
    },
  ];

  const { pinnedApps } = usePinnedApps();

  return (
    <>
      {apps
        .filter((app) => pinnedApps.includes(app.appUrl))
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
