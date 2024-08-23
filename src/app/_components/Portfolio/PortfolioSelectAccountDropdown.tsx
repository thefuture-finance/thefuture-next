"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidEthereumAddress } from "@/utils/regex";
import { notify, ToastMessageType } from "@/utils/notification";
import PortfolioAutoComplete from "./PortfolioAutoComplete";
import { useQuery } from "@tanstack/react-query";
import { useAccountInfo } from "@/store/getAccountInfo";

const addressBook = [
  { address: "0xE8c89d6918660e0c36aB60d87f094d68dc4dde75", name: "" },
  { address: "0xd6241489026aD9043097E1EdEBBc6A34f7d95fc4", name: "" },
  { address: "0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8", name: "" },
];

async function getList(filter: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lowerFilter = filter.toLocaleLowerCase();
  return addressBook
    .filter(({ address }) =>
      address.toLocaleLowerCase().startsWith(lowerFilter),
    )
    .slice(0, 20);
}

export function SelectAccountDropdownButton({
  selectedAddress,
}: {
  selectedAddress: string;
}) {
  const { accountInfo, addRecentSearch, removeRecentSearch } = useAccountInfo();
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  const searchQueryData = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  function deleteRecentSearch(address: string) {
    removeRecentSearch(address);
  }

  function setSelectedValue(address: string) {
    if (!isValidEthereumAddress(address)) {
      notify("this is not a valid etherum address", {
        messageType: ToastMessageType.Warning,
      });
      return;
    }
    if (address == selectedAddress) {
      notify("this address is already selected", {
        messageType: ToastMessageType.Warning,
      });
      return;
    }

    if (
      !accountInfo?.recentSearchs?.find((value) => {
        return value?.address == address;
      })
    ) {
      addRecentSearch(
        addressBook.find((value) => {
          return value?.address == address;
        }) || { address: address, name: "" },
      );
    }
    router.push(`/portfolio?address=${address}`);
  }

  function onClickSetAddress() {
    router.push(`/portfolio?address=${searchValue}`);
  }

  return (
    <PortfolioAutoComplete
      selectedValue={selectedAddress}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onDeleteRecentSearch={deleteRecentSearch}
      historyItems={accountInfo.recentSearchs ?? []}
      items={searchQueryData.data ?? []}
      isLoading={searchQueryData.isLoading}
      emptyMessage="No pokemon found."
      placeholder="Address, domain or identity"
    />
  );
}
