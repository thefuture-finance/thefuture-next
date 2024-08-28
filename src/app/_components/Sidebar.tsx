import Link from "next/link";
import dynamic from "next/dynamic";

import ScrollNameIcon from "~/public/scrollName.svg";
import ExampleLogoIcon from "~/public/home.svg";
import TheFutureIcon from "~/public/theFutureLogo.svg";
import {
  FaWallet,
  FaStar,
  FaAddressBook,
  FaCompass,
  FaLocationArrow,
  FaArrowRightArrowLeft,
  FaBook,
} from "react-icons/fa6";
import { MdApps } from "react-icons/md";

const DynamicConnectWallet = dynamic(
  () => import("@/app/_components/ConnectWallet"),
  {
    ssr: false,
    loading: () => (
      <>
        <div className="bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)]">
          Connect Wallet
        </div>
      </>
    ),
  },
);
const DynamicSelectAccountModal = dynamic(
  () => import("@/app/_components/SelectAccountModal"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)]">
        Select Wallet
      </div>
    ),
  },
);

import { useParams, usePathname } from "next/navigation";
import ChangeNetwork from "./ChangeNetwork";
import PinnedAppsSidebar from "./PinnedAppsSidebar";
import { Suspense } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function Sidebar() {
  const selectedPage = usePathname().replace("/", "");

  return (
    <>
      <div className="bg-red w-[280px] shrink-0 h-full py-6 flex flex-col items-center drag-none select-none">
        <div className="flex flex-col grow overflow-y-auto small-scrollbar">
          <Link href="/" className="flex w-full rounded-lg py-1">
            <TheFutureIcon />
          </Link>

          <div className="flex flex-col gap-2 mt-4 ">
            <span className="font-bold text-[16px] leading-[15px] text-[rgba(247,247,247,0.6)]">
              Overview
            </span>
            <Link
              href="/portfolio"
              className={
                "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
                (selectedPage == "portfolio" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <FaWallet
                className={"w-6 h-6"}
                color="#F7F7F7"
                // color={`${
                //   selectedPage == "portfolio"
                //     ? "fill-[#F7F7F7]"
                //     : "fill-[#F7F7F7]"
                // }`}
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                Portfolio
              </span>
            </Link>
            <Link
              href="/favorites"
              className={
                "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
                (selectedPage == "favorites" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <FaStar className={"w-6 h-6"} color="#F7F7F7" />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                Favorites
              </span>
            </Link>

            <Link
              href="/explore"
              className={
                "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
                (selectedPage == "explore" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <FaCompass className={"w-6 h-6"} color="#F7F7F7" />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                Explore
              </span>
            </Link>

            <Link
              href="/education"
              className={
                "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
                (selectedPage == "education" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <FaBook className={"w-6 h-6"} color="#F7F7F7" />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                Education
              </span>
            </Link>

            <HoverCard openDelay={100}>
              <HoverCardTrigger className="flex">
                <div
                  className={
                    "pl-3 flex items-center w-full hover:bg-[rgba(30,30,30)] rounded-lg py-2 " +
                    (selectedPage == "address-book"
                      ? "bg-[rgba(50,50,50)]"
                      : "")
                  }
                >
                  <FaAddressBook className={"w-6 h-6"} color="#F7F7F7" />
                  <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                    Address Book
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-50 p-2 bg-[#0E0C12] text-[#F7F7F7]">
                <div className="flex">Coming Soon</div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="font-bold text-[15px] leading-[25px] text-[rgba(247,247,247,0.6)]">
              Apps
            </span>

            <Link
              href="/apps"
              className={
                "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
                (selectedPage == "apps" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <MdApps className={"w-6 h-6"} color="#F7F7F7" />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                Apps
              </span>
            </Link>

            <Link
              href="/swap"
              className={
                "pl-3 flex items-center w-full hover:bg-[rgba(60,60,60)] rounded-lg py-2 " +
                (selectedPage == "swap" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <FaArrowRightArrowLeft className={"w-6 h-6"} color="#F7F7F7" />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                Swap
              </span>
            </Link>

            <HoverCard openDelay={100}>
              <HoverCardTrigger className="flex">
                <div
                  className={
                    "pl-3 flex items-center w-full hover:bg-[rgba(30,30,30)] rounded-lg py-2 " +
                    (selectedPage == "send" ? "bg-[rgba(50,50,50)]" : "")
                  }
                >
                  <FaLocationArrow className={"w-6 h-6"} color="#F7F7F7" />
                  <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[18px] leading[24px] font-light ml-2">
                    Send
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-50 p-2 bg-[#0E0C12] text-[#F7F7F7]">
                <div className="flex">Coming Soon</div>
              </HoverCardContent>
            </HoverCard>

            <Suspense>
              <PinnedAppsSidebar />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center w-full px-6 pt-3">
          <DynamicSelectAccountModal />
          <ChangeNetwork />
          <DynamicConnectWallet />
        </div>
      </div>
    </>
  );
}
