import Link from "next/link";
import dynamic from "next/dynamic";

import ScrollNameIcon from "~/public/scrollName.svg";
import ExampleLogoIcon from "~/public/home.svg";
import TheFutureIcon from "~/public/theFutureLogo.svg";
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

export function Sidebar() {
  const selectedPage = usePathname().replace("/", "");

  return (
    <>
      <div className="bg-red w-[280px] h-full py-6 flex flex-col items-center drag-none select-none">
        <div className="flex flex-col grow">
          <Link href="/" className="flex w-full rounded-lg py-1">
            <TheFutureIcon />
          </Link>

          <div className="flex flex-col gap-4 mt-4 ">
            <span className="font-bold text-[20px] leading-[25px] text-[rgba(247,247,247,0.6)]">
              Overview
            </span>
            <Link
              href="/portfolio"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "portfolio" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "portfolio"
                    ? "text-[rgba(205,193,176)]"
                    : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Portfolio
              </span>
            </Link>
            <Link
              href="/favorites"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "favorites" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "favorites"
                    ? "text-[rgba(205,193,176)]"
                    : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Favorites
              </span>
            </Link>

            <Link
              href="/address-book"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "address-book" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "address-book"
                    ? "text-[rgba(205,193,176)]"
                    : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Address Book
              </span>
            </Link>

            <Link
              href="/explore"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "explore" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "explore" ? "text-[rgba(205,193,176)]" : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Explore
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <span className="font-bold text-[20px] leading-[25px] text-[rgba(247,247,247,0.6)]">
              Apps
            </span>

            <Link
              href="/apps"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "apps" || selectedPage == "app"
                  ? "bg-[rgba(50,50,50)]"
                  : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "apps" || selectedPage == "app"
                    ? "text-[rgba(205,193,176)]"
                    : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Apps
              </span>
            </Link>

            <Link
              href="/send"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "send" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "send" ? "text-[rgba(205,193,176)]" : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Send
              </span>
            </Link>

            <Link
              href="/swap"
              className={
                "flex w-full hover:bg-[rgba(60,60,60)] rounded-lg py-1 " +
                (selectedPage == "swap" ? "bg-[rgba(50,50,50)]" : "")
              }
            >
              <ExampleLogoIcon
                className={
                  "w-8 h-8 " +
                  (selectedPage == "swap" ? "text-[rgba(205,193,176)]" : "")
                }
              />
              <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[23px] leading[24px] font-light ml-2">
                Swap
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center w-full  px-6">
          <DynamicSelectAccountModal />
          <ChangeNetwork />
          <DynamicConnectWallet />
        </div>
      </div>
    </>
  );
}
