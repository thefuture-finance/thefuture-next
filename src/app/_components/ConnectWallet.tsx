"use client";

import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { extractParts, roundNumber } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { login } from "@/utils/auth";
import { BrowserProvider, formatEther } from "ethers";
import { trpc } from "../_trpc/client";

export default function ConnectButton() {
  const { open, close } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const loginMutation = trpc.authRouter.login.useMutation();

  async function handleLogin() {
    await open({ view: "Account" });
    // const provider = new BrowserProvider(walletProvider);
    // const signer = await provider.getSigner();
    // await login("asd", signer, loginMutation);
  }

  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function getBalance() {
      if (isConnected) {
        const provider = new BrowserProvider(walletProvider);
        const balance = await provider?.getBalance(address);
        setBalance(() => roundNumber(Number(formatEther(balance)), 2));
      }
    }
    getBalance();
  }, [address, walletProvider]);

  return (
    <div className="bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)]">
      <div className="w-full text-[#F7F7F7]">
        {isConnected ? (
          <div className="w-full">
            <button className="w-full" onClick={() => handleLogin()}>
              {`${extractParts(address, 6, 4)} | ${balance} ETH`}
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
    </div>
  );
}
