"use client";

import { Button } from "@/app/_components/ui/button";
import DeleteSvg from "~/public/close.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidEthereumAddress } from "@/utils/regex";
import { notify, ToastMessageType } from "@/utils/notification";

export function SelectAccountDropdownButton({ address }: { address: String }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [address]);

  const addressBook = [
    { address: "0xE8c89d6918660e0c36aB60d87f094d68dc4dde75", name: "" },
    { address: "0xd6241489026aD9043097E1EdEBBc6A34f7d95fc4", name: "" },
    { address: "0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8", name: "" },
    { address: "0xE8c89d6918660e0c36aB60d87f094d68dc4dde75", name: "" },
    { address: "0xd6241489026aD9043097E1EdEBBc6A34f7d95fc4", name: "" },
    { address: "0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8", name: "" },
  ];

  function onClickChangeAddress(address: string) {
    router.push(`/portfolio?address=${address}`);
  }

  function onClickSetAddress() {
    if (!isValidEthereumAddress(inputValue)) {
      notify("this is not a valid etherum address", {
        messageType: ToastMessageType.Warning,
      });
      return;
    }
    if (inputValue == address) {
      notify("this address is already selected", {
        messageType: ToastMessageType.Warning,
      });
      return;
    }
    router.push(`/portfolio?address=${inputValue}`);
  }

  return (
    <div
      onBlur={(e) => {
        if (
          e.relatedTarget !== e.currentTarget &&
          !e.currentTarget.contains(e.relatedTarget)
        ) {
          setIsOpen(false);
        }
      }}
      tabIndex={0}
      className="relative flex flex-col p-4 w-128 z-[100]"
    >
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        {address || "Select Address"}
      </Button>
      <div
        className={`${isOpen ? "flex" : "hidden"} bg-gray-50 w-full flex-col`}
      >
        {addressBook
          .filter((data) => {
            return data.address != address;
          })
          .map((data, index) => {
            return (
              <>
                <div
                  key={index}
                  className="cursor-pointer p-4 h-16 flex hover:bg-gray-200 justify-center items-center gap-4 border-b border-b-black"
                >
                  <button
                    onClick={() => onClickChangeAddress(data.address)}
                    className="flex grow-1 h-full items-center"
                  >
                    {data.address}
                  </button>
                  <span className="flex h-8 aspect-square rounded-2xl hover:bg-gray-400 text-[black]">
                    <DeleteSvg className="w-full h-full text-[black]" />
                  </span>
                </div>
              </>
            );
          })}
        <div className="w-full flex p-2 gap-2">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full h-12 text-sm outline-none rounded bg-gray-200 p-2"
            placeholder="give address"
          />
          <button
            onClick={() => {
              onClickSetAddress();
            }}
            className="p-2 rounded flex justify-center items-center text-2xl hover:text-gray-600 hover:bg-gray-200 cursor-pointer"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
