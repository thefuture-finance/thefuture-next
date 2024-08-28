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
      className="text-xl font-bold bg-[rgba(205,193,176)] w-full h-[32px] rounded-2xl cursor-pointer hover:bg-[rgba(185,173,156)] flex justify-center items-center"
    >
      <div className="typing-demo w-[6ch] flex justify-center text-center">
        <span className="w-full">Scroll</span>
      </div>
    </div>
  );
}
