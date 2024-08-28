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
  FaMoneyBillTrendUp,
  FaGear,
} from "react-icons/fa6";
import { MdApps, MdAccountBalance } from "react-icons/md";
import Image from "next/image";

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
import { cn } from "@/lib/utils";
import SideBarLink from "./SideBarLink";
import SideBarLinkComing from "./SideBarLinkComing";

export function Sidebar() {
  const selectedPage = usePathname().replace("/", "");

  return (
    <>
      <div className="group-container group bg-red shrink-0 h-full py-6 flex flex-col items-center drag-none select-none hover:px-4 transition-all duration-300 ease-linear">
        <div className="flex flex-col grow overflow-y-auto small-scrollbar w-full overflow-x-hidden">
          <Link href="/" className="w-full rounded-lg py-2 h-16 flex shrink-0">
            <div className="hidden group-hover:flex w-justify-center w-4 group-hover:grow transition-all duration-500 ease-linear h-full">
              <TheFutureIcon className="w-full" />
            </div>
            <div className="flex group-hover:hidden w-full justify-center h-full">
              <Image
                alt={"theFuture"}
                src={"/assets/images/theFutureLogo.png"}
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </div>
          </Link>

          <div className="flex flex-col gap-1 mt-4 ">
            <span className="font-bold text-[16px] leading-[15px] text-[rgba(247,247,247,0.6)] invisible group-hover:visible self-start w-0 group-hover:typing-demo">
              Overview
            </span>

            <SideBarLink href={"portfolio"} Name={"Portfolio"}>
              <FaWallet
                className={"w-6 h-6 text-black"}
                color="#F7F7F7"
                // color={`${
                //   selectedPage == "portfolio"
                //     ? "fill-[#F7F7F7]"
                //     : "fill-[#F7F7F7]"
                // }`}
              />
            </SideBarLink>

            <SideBarLink href={"favorites"} Name={"Favorites"}>
              <FaStar className={"w-6 h-6 text-black"} color="#F7F7F7" />
            </SideBarLink>

            <SideBarLink href={"explore"} Name={"Explore"}>
              <FaCompass className={"w-6 h-6 text-black"} color="#F7F7F7" />
            </SideBarLink>

            <SideBarLink href={"education"} Name={"Education"}>
              <FaBook className={"w-6 h-6 text-black"} color="#F7F7F7" />
            </SideBarLink>

            <SideBarLinkComing href={"address-book"} name={"Address Book"}>
              <FaAddressBook className={"w-6 h-6"} color="#F7F7F7" />
            </SideBarLinkComing>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="font-bold text-[15px] leading-[25px] text-[rgba(247,247,247,0.6)] invisible group-hover:visible w-0 self-start group-hover:typing-demo">
              Apps
            </span>

            <SideBarLink href={"apps"} Name={"Apps"}>
              <MdApps className={"w-6 h-6"} color="#F7F7F7" />
            </SideBarLink>
            <SideBarLink href={"swap"} Name={"Bridge & Swap"}>
              <FaArrowRightArrowLeft className={"w-6 h-6"} color="#F7F7F7" />
            </SideBarLink>

            <SideBarLinkComing href={"send"} name={"Send"}>
              <FaLocationArrow className={"w-6 h-6"} color="#F7F7F7" />
            </SideBarLinkComing>

            <SideBarLinkComing href={"earn"} name={"Earn"}>
              <FaMoneyBillTrendUp className={"w-6 h-6"} color="#F7F7F7" />
            </SideBarLinkComing>

            <SideBarLinkComing href={"settings"} name={"Settings"}>
              <FaGear className={"w-6 h-6"} color="#F7F7F7" />
            </SideBarLinkComing>

            <Suspense>
              <PinnedAppsSidebar />
            </Suspense>
          </div>
        </div>
        <div className="flex-col gap-3 items-center w-full pt-8 hidden group-hover:flex transition-all duration-500 ease-out">
          <DynamicSelectAccountModal />
          <ChangeNetwork />
          <DynamicConnectWallet />
        </div>
        <div className="flex-col gap-5 items-center w-full pt-8 flex group-hover:hidden ">
          <MdAccountBalance
            className={"w-6 h-6 text-black"}
            color="#F7F7F7"
            // color={`${
            //   selectedPage == "portfolio"
            //     ? "fill-[#F7F7F7]"
            //     : "fill-[#F7F7F7]"
            // }`}
          />
          <Image
            alt={"scroll"}
            src={"/assets/images/scroll.png"}
            className="w-6 h-6"
            width={24}
            height={24}
          />

          <FaWallet
            className={"w-6 h-6 text-black"}
            color="#F7F7F7"
            // color={`${
            //   selectedPage == "portfolio"
            //     ? "fill-[#F7F7F7]"
            //     : "fill-[#F7F7F7]"
            // }`}
          />
        </div>
      </div>
    </>
  );
}
