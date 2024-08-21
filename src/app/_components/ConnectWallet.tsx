"use client";

import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { extractParts } from "@/utils/formatters";

export default function ConnectButton() {
  const { open, close } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return (
    <>
      <div className="w-full text-[#F7F7F7]">
        {isConnected ? (
          <div className="w-full">
            <button
              className="w-full"
              onClick={() => open({ view: "Account" })}
            >
              {`${extractParts(address, 6, 4)} | 25 ETH`}
            </button>
          </div>
        ) : (
          <div className="w-full">
            <button
              className="w-full"
              onClick={() => open({ view: "Connect" })}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </>
  );
}
