"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { usePinnedApps } from "@/store/usePinnedApps";

type Networks = "scroll" | "ethereum" | "polygon";

type Category =
  | "Defi"
  | "Fundraising"
  | "Dashboard"
  | "Lending/Borrowing"
  | "Staking"
  | "Bridge";

type Socials =
  | `https://discord.com/invite/${string}`
  | `https://x.com/${string}`
  | `https://github.com/${string}`;

export type AppCardData = {
  networks: Networks[];
  category: Category[];
  socials: Socials[];
  isAutoConnect: boolean;
  appUrl: string;
  description: string;
  logo: string;
  name: string;
};

export default function AppCard({
  networks,
  category,
  socials,
  isAutoConnect,
  logo,
  name,
  appUrl,
  description,
}: AppCardData) {
  const fav = true;
  const { pinnedApps, addPinnedApps, removePinnedApps } = usePinnedApps();

  function setPinned() {
    if (pinnedApps.includes(appUrl)) {
      removePinnedApps(appUrl);
      return;
    }
    addPinnedApps(appUrl);
  }

  return (
    <div className="relative">
      <div
        className="absolute top-3 right-3 p-3 hover:#CDC1B0"
        onClick={() => setPinned()}
      >
        {pinnedApps.includes(appUrl) ? (
          <FaBookmark className="cursor-pointer" color="#F7F7F7" />
        ) : (
          <FaRegBookmark className="cursor-pointer" color="#F7F7F7" />
        )}
      </div>
      <Link
        href={`/app?appUrl=${appUrl}`}
        className="bg-[rgba(25,25,25)] min-w-[248px] max-w-[400px] h-[228px] lg:h-[280px] rounded-xl flex flex-col hover:bg-[rgba(32,32,32)] hover:border-[#CDC1B0] border-[rgba(0,0,0,0)] border shadow-xl text-[#F7F7F7]"
      >
        <div className="px-4 pt-6 flex gap-3 font-bold text-xl justify-start items-center">
          <Image
            alt={name}
            src={logo}
            className="w-12 h-12"
            width={48}
            height={48}
          />
          {name}
        </div>
        <div className="flex flex-col p-4 pb-6">
          <span className="text-sm">{description}</span>
          <div className="flex flex-wrap gap-2 pt-4 auto-fill-100">
            {category.map((categoryName, index) => {
              return (
                <span
                  key={index}
                  className="bg-gray-600 rounded shrink px-3 flex text-[13px] leading-[22px]"
                >
                  {categoryName}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}
