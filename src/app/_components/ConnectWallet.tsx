"use client";

import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useWeb3ModalState,
} from "@web3modal/ethers/react";
import { extractParts, roundNumber } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { login } from "@/utils/auth";
import { BrowserProvider, formatEther } from "ethers";
import { trpc } from "../_trpc/client";
import { useAccountInfo } from "@/store/getAccountInfo";
import dayjs from "dayjs";
import { useSpinnerStore } from "@/store/spinner";

export default function ConnectButton() {
  const { open, close } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { accountInfo, setIsLogged } = useAccountInfo();
  const { setSpinner } = useSpinnerStore();
  const loginMutation = trpc.authRouter.login.useMutation();

  async function handleConnect() {
    setIsLogged(false);
    await open({ view: "Connect" });
  }

  useEffect(() => {
    (async () => {
      if (isConnected) {
        try {
          setSpinner(true);
          const provider = new BrowserProvider(walletProvider);
          const signer = await provider.getSigner();
          await login(dayjs().add(7, "day").format(), signer, loginMutation);
          setIsLogged(true);
        } catch (err) {
          console.log(err);
        }
        setSpinner(false);
      }
    })();
  }, [isConnected]);

  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function getBalance() {
      if (isConnected) {
        const provider = new BrowserProvider(walletProvider);
        const balance = await provider?.getBalance(address);
        setBalance(() => roundNumber(Number(formatEther(balance)), 2));
      }
    }
    try {
      getBalance();
    } catch (err) {}
  }, [address, walletProvider, isConnected]);

  return (
    <div
      className={`bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center ${accountInfo.selectedAccount.isSmart ? "hover:bg-[rgba(55,55,55)]" : "bg-[rgba(64,150,166)]"} `}
    >
      <div className="w-full text-[#F7F7F7]">
        {isConnected ? (
          <div className="w-full">
            <button
              className="w-full"
              onClick={() => open({ view: "Account" })}
            >
              {`${extractParts(address, 6, 4)} | ${balance} ETH`}
            </button>
          </div>
        ) : (
          <div className="w-full">
            <button className="w-full" onClick={() => handleConnect()}>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
