"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/app/_components/Sidebar";
import { AppKit } from "@/context/web3modal";
import { Topbar } from "@/app/_components/Topbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSpinnerStore } from "@/store/spinner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TRPCProvider from "@/app/_trpc/TRPCProvider";
import { useAccountInfo } from "@/store/getAccountInfo";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const NeueMachina = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMachina-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMachina-Medium.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/NeueMachina-Bold.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let [color, setColor] = useState("#ffffff");
  const loading = useSpinnerStore((state) => state.isSpinnerActive);
  const { accountInfo, setSelectedAccount } = useAccountInfo();
  const { address, chainId } = useWeb3ModalAccount();
  useEffect(() => {
    if (!accountInfo.selectedAccount.isSmart) {
      setSelectedAccount(address, accountInfo.selectedAccount.isSmart, chainId);
    }
  }, [
    address,
    accountInfo.selectedAccount.isSmart,
    setSelectedAccount,
    chainId,
  ]);

  return (
    <html lang="en">
      <body className={NeueMachina.className}>
        <TRPCProvider>
          <Toaster />
          <div
            className={`z-[90] absolute w-full h-full bg-gray-300 opacity-30 ${loading ? "block" : "hidden"}`}
          />
          <ClipLoader
            className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] opacity-80 z-[90]"
            color={color}
            loading={loading}
            size={500}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <QueryClientProvider client={queryClient}>
            <AppKit>
              <div className="relative flex h-full w-full overflow-hidden">
                <Sidebar />
                <div className="grow mr-5 mt-5 mb-8 rounded-3xl bg-[rgba(55,55,55)] z-10 shadow-[inset_0_0px_6px_0px_rgba(23,23,23)] overflow-auto">
                  {children}
                  <div className="absolute bottom-0 w-[calc(100%-280px)] flex justify-center h-8 items-center">
                    <span className="text-[#F7F7F7] text-[16px] leading-[19px] font-semibold">
                      TheFuture All Rights Reserverd 2024
                    </span>
                    <span className="absolute right-0 mr-4 text-[#F7F7F7]">
                      beta v0.1.0
                    </span>
                  </div>
                </div>
              </div>
            </AppKit>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
