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
import { extractParts, roundNumber } from "@/utils/formatters";
import { isValidEthereumAddress } from "@/utils/regex";
import { trpc } from "../_trpc/client";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { useAccountInfo } from "@/store/getAccountInfo";
import { createSmartAccount } from "@/utils/smartAccount";
import { BrowserProvider, formatEther } from "ethers";
import { login } from "@/utils/auth";
import { useSpinnerStore } from "@/store/spinner";

export default function SelectAccountModal() {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { accountInfo, setIsLogged, setSelectedAccount } = useAccountInfo();
  const { setSpinner } = useSpinnerStore();
  const safeAddress = trpc.userInfoRouter.getAccounts.useQuery({ id: address });
  const addAccountMutation = trpc.userInfoRouter.addAccount.useMutation();
  const [balance, setBalance] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  useEffect(() => {
    async function getBalance() {
      if (isConnected) {
        const provider = new BrowserProvider(walletProvider);
        const balance = await provider?.getBalance(
          accountInfo.selectedAccount.address,
        );
        setBalance(() => roundNumber(Number(formatEther(balance)), 2));
      }
    }
    getBalance();
  }, [accountInfo.selectedAccount.address, walletProvider]);

  async function onCreateSmartAccount() {
    const safeAddress = await createSmartAccount(address, walletProvider);
    addAccountMutation.mutate({
      address: safeAddress,
      chainId: chainId.toString(),
    });
  }

  const loginMutation = trpc.authRouter.login.useMutation();

  async function handleLogin() {
    try {
      setSpinner(true);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      await login("asd", signer, loginMutation);
      setIsLogged(true);
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
      console.log(err);
    }
  }

  if (!isConnected) return null;
  if (!accountInfo.isLogged)
    return (
      <div
        onClick={handleLogin}
        className="cursor-pointer bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)]"
      >
        To Select Wallet Login
      </div>
    );

  return (
    <Dialog open={openSelect} onOpenChange={setOpenSelect}>
      <DialogTrigger asChild>
        <Button className="bg-[rgba(65,65,65)] h-[43px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)] flex-col">
          <div>Select Account</div>
          {isValidEthereumAddress(accountInfo.selectedAccount.address) ||
          true ? (
            <div>{`${extractParts(accountInfo.selectedAccount.address, 6, 4)} | ${balance} ETH`}</div>
          ) : (
            "unknown eth address"
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
          <div
            onClick={() => {
              setSelectedAccount(address, false, chainId);
              setOpenSelect(false);
            }}
            key={address}
            className="p-2 flex w-full rounded border-2 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex grow justify-between items-center">
              <div className="grow">{`${extractParts(address, 6, 4)} | 25 ETH`}</div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {safeAddress.isFetched &&
            safeAddress?.data?.map((data) => {
              return (
                <div
                  onClick={() => {
                    setSelectedAccount(data.address, true, data.chainId);
                    setOpenSelect(false);
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
              );
            })}
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
