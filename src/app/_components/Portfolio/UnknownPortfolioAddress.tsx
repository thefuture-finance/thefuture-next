"use client";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UnknownPortfolioAddress() {
  const router = useRouter();
  const { isConnected, address } = useWeb3ModalAccount();
  const searchParams = useSearchParams();
  const paramAddress = searchParams.get("address") ?? "";

  if (isConnected) {
    router.push(`/portfolio?address=${address}`);
  }

  if (!isConnected && paramAddress != "") {
    return (
      <>
        <div className="w-full h-32 flex justify-center">
          <span>The address&nbsp;</span>
          <span className="font-bold">{paramAddress}&nbsp;</span>
          <span>is not valid choose another</span>
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-32 flex justify-center">
      Connect Your Wallet to see your Assets
    </div>
  );
}
