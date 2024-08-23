"use client";

import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { extractParts } from "@/utils/formatters";

import ScrollNameIcon from "~/public/scrollName.svg";

export default function ChangeNetwork() {
  const { open, close } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return (
    <div
      onClick={() => open({ view: "Networks" })}
      className="bg-[rgba(205,193,176)] h-[43px] w-full rounded-2xl flex justify-center items-center cursor-pointer hover:bg-[rgba(185,173,156)]"
    >
      <ScrollNameIcon />
    </div>
  );
}
