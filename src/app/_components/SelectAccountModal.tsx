"use client";
import { Copy } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { extractParts } from "@/utils/formatters";
import { isValidEthereumAddress } from "@/utils/regex";
import { trpc } from "../_trpc/client";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect } from "react";
import { useAccountInfo } from "@/store/getAccountInfo";
import { createSmartAccount } from "@/utils/smartAccount";

export default function SelectAccountModal() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { accountInfo, setSelectedAccount } = useAccountInfo();
  const safeAddress = trpc.userInfoRouter.getAccounts.useQuery({ id: address });
  const addAccountMutation = trpc.userInfoRouter.addAccount.useMutation();

  if (!isConnected) return null;

  async function onCreateSmartAccount() {
    const safeAccountAddress = await createSmartAccount(
      address,
      walletProvider,
    );
    addAccountMutation.mutate({ id: safeAccountAddress });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)] flex-col">
          <div>Select Account</div>
          {isValidEthereumAddress(accountInfo.selectedAccount.address) && (
            <div>{`${extractParts(accountInfo.selectedAccount.address, 6, 4)} | 25 ETH`}</div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Smart Accounts</DialogTitle>
          <DialogDescription>
            Select Smart Account or Create New one.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col gap-2">
          {safeAddress.isFetched &&
            safeAddress?.data?.map((data) => (
              <div
                onClick={() => {
                  console.log("asd");
                  setSelectedAccount(data.address, true);
                }}
                key={data.address}
                className="p-2 flex w-full rounded border-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex grow justify-between items-center">
                  <div className="grow">{`${extractParts(data.address, 6, 4)} | 25 ETH`}</div>
                  <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)] flex-col">
                <div>Create Account</div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Smart Account</DialogTitle>
                <DialogDescription>
                  Select Smart Account or Create New one.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center flex-col gap-2">
                <Button
                  onClick={() => {
                    onCreateSmartAccount();
                  }}
                >
                  Create Account
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
