"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SelectAccountDropdownButton({ address }: { address: String }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

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
          .map((data) => {
            return (
              <>
                <Link
                  href={`/portfolio?address=${data.address}`}
                  className="p-4 cursor-pointer hover:bg-gray-200"
                >
                  {data.address}
                </Link>
              </>
            );
          })}
        <div className="w-full flex">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full h-12 text-2xl"
            placeholder="give address"
          />
          <Link href={`/portfolio?address=${inputValue}`}>Select</Link>
        </div>
      </div>
    </div>
  );
}
