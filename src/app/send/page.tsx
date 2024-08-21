"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AutoComplete } from "@/app/_components/AutoComplete";
import { useQuery } from "@tanstack/react-query";

import data from "./data.json";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
// import { approve, transfer } from "@/lib/tokenSender";
import { BrowserProvider } from "ethers";

async function getList(filter: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lowerFilter = filter.toLocaleLowerCase();
  return data
    .filter(({ name }) => name.toLocaleLowerCase().startsWith(lowerFilter))
    .slice(0, 20)
    .map(({ name, id }) => ({
      value: id,
      label: `${name}`,
    }));
}

function Send() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "token";

  const [searchValue, setSearchValue] = useState<string>("");
  const [amount, setAmount] = useState<Number | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(
    "0x63598b60BA534b71312E267e0926Efb1907D97d6",
  );
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  async function sendToken(
    contractAddress: string,
    receiver: String,
    amount: Number,
  ) {
    console.log(contractAddress, receiver, amount);
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    // await approve(signer, contractAddress, receiver, amount);
    const ethersProvider2 = new BrowserProvider(walletProvider);
    const signer2 = await ethersProvider2.getSigner();
    // await transfer(signer2, contractAddress, receiver, amount);
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center text-white">
        <div className="w-[500px] bg-[rgba(37,37,37)] rounded-lg p-8 border-[gray] border">
          <div className="flex">
            <div
              className={`h-8 flex justify-center items-start basis-1/2 border-b cursor-pointer ${type == "token" ? "border-[blue]" : "border-[gray] hover:border-[white]"}`}
              onClick={() => router.push("?type=token")}
            >
              Token
            </div>
            <div
              className={`h-8 flex justify-center items-start basis-1/2 border-b cursor-pointer ${type == "nft" ? "border-[blue]" : "border-[gray] hover:border-[white]"}`}
              onClick={() => router.push("?type=nft")}
            >
              NFT
            </div>
          </div>
          <div className="flex flex-col mt-5 w-full">
            <div className="flex justify-start items-center gap-3">
              <div className="w-6 h-6 bg-green-300 rounded"></div>
              <div className="flex items-center">Scroll</div>
              <div className="flex items-center">\/</div>
            </div>
            <div className="flex flex-col gap-2 w-full mt-5">
              <div className="flex flex-col gap-1 p-4 w-full h-[100px] border border-white rounded-lg">
                <div className="flex justify-start">Recipient</div>
                <div className="flex gap-2 items-center">
                  <div className="flex grow gap-2 items-center">
                    <div className="w-6 h-6 bg-green-300 rounded"></div>
                    <AutoComplete
                      selectedValue={selectedValue}
                      onSelectedValueChange={setSelectedValue}
                      searchValue={searchValue}
                      onSearchValueChange={setSearchValue}
                      items={data ?? []}
                      isLoading={isLoading}
                      emptyMessage="No pokemon found."
                      placeholder="Address, domain or identity"
                    />
                  </div>
                  <div className="w-6 h-6 bg-green-300 rounded"></div>
                </div>
                <div>0x6921ec077a6f4e93058759628b6d029f13054b39</div>
              </div>
              <div className="flex flex-col gap-1 p-4 w-full h-[100px] border border-white rounded-lg">
                <div className="flex justify-start"></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex mt-4">
            <div
              onClick={async () => {
                await sendToken(
                  contractAddress,
                  "0x26C063B43d2d46CAc149dEE9BbcAD9e768FdEF9b",
                  2,
                );
              }}
              className="w-full bg-green-500 hover:bg-green-400 rounded-lg h-9 text-xl flex justify-center items-center hover:text-gray-300 cursor-pointer"
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SendSuspensed() {
  return (
    <Suspense>
      <Send />
    </Suspense>
  );
}
