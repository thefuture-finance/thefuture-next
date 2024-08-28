"use client";
import dayjs from "dayjs";
import { Copy, Loader2 } from "lucide-react";
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
import { FaRegCopy } from "react-icons/fa6";
import { serverClient } from "../_trpc/serverClient";
import { cn } from "@/lib/utils";

export default function SelectAccountModal() {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const utils = trpc.useUtils();
  const { accountInfo, setSmartAccounts, setIsLogged, setSelectedAccount } =
    useAccountInfo();
  const [isLoading, setIsLoading] = useState(false);

  const favorites = trpc.favoritesRouter.listFavorites.useQuery();
  const { setSpinner } = useSpinnerStore();
  type accountType = Awaited<
    ReturnType<(typeof serverClient)["userInfoRouter"]["getAccounts"]>
  >;

  const safeAddress = trpc.userInfoRouter.getAccounts.useQuery({ id: address });

  const addAccountMutation = trpc.userInfoRouter.addAccount.useMutation({
    onMutate: async (newFav: accountType[number]) => {
      await utils.userInfoRouter.getAccounts.cancel();
      const previousSmartAccounts = utils.userInfoRouter.getAccounts.getData({
        id: address,
      });
      utils.userInfoRouter.getAccounts.setData(
        { id: address },
        (old: accountType) => {
          return [...(old ?? []), newFav];
        },
      );

      return { previousSmartAccounts };
    },
    onError: (err, newFav, context) => {
      console.log(err);
      console.log("errr");
      console.log(context.previousSmartAccounts);
      utils.userInfoRouter.getAccounts.setData(
        { id: address },
        context.previousSmartAccounts || [],
      );
    },
    onSettled: () => {
      console.log("done");
      utils.favoritesRouter.listFavorites.invalidate();
    },
  });
  const [balance, setBalance] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    async function getBalance() {
      if (isConnected && accountInfo.selectedAccount.address) {
        const provider = new BrowserProvider(walletProvider);
        const balance = await provider?.getBalance(
          accountInfo.selectedAccount.address,
        );
        setBalance(() => roundNumber(Number(formatEther(balance)), 2));
      }
    }
    getBalance();
  }, [accountInfo.selectedAccount.address, walletProvider, isConnected]);

  async function onCreateSmartAccount() {
    try {
      setIsLoading(true);
      const safeAddress = await createSmartAccount(address, walletProvider);
      setOpenCreate(false);
      addAccountMutation.mutate({
        address: safeAddress,
        chainId: chainId.toString(),
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  const loginMutation = trpc.authRouter.login.useMutation();

  async function handleLogin() {
    try {
      setSpinner(true);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      await login(dayjs().add(7, "day").format(), signer, loginMutation);
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
        className="cursor-pointer bg-[rgba(65,65,65)] h-[32px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)] text-[#F7F7F7]"
      >
        <div className="typing-demo w-[8ch] text-center">
          <span className="w-full">Sign In</span>
        </div>
      </div>
    );

  return (
    <Dialog open={openSelect} onOpenChange={setOpenSelect}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-[rgba(65,65,65)] h-[32px] rounded-2xl flex w-full justify-center items-center text-[16px] ",
            {
              "hover:bg-[rgba(55,55,55)]": !accountInfo.selectedAccount.isSmart,
              "bg-[rgba(64,150,166)]": accountInfo.selectedAccount.isSmart,
            },
          )}
        >
          {isValidEthereumAddress(accountInfo.selectedAccount.address) &&
          !!accountInfo?.selectedAccount?.isSmart ? (
            <div className="typing-demo text-[14px] leading-[12px] w-[18ch] text-center">
              <span className="w-full">
                {`${extractParts(accountInfo.selectedAccount.address, 6, 4)} | ${balance} ETH`}
              </span>
            </div>
          ) : (
            <div className="typing-demo w-[14ch]">Use Smart Account</div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[320px] bg-[#121313] rounded-[36px] border-0 text-white shadow-[0_0px_0px_1px_rgba(255,255,255,0.05)]">
        <DialogHeader>
          <DialogTitle>Smart Accounts</DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col gap-2">
          {!!safeAddress?.data?.length && (
            <Button
              disabled={accountInfo.selectedAccount.address == address}
              onClick={() => {
                setSelectedAccount(address, false, chainId);
                setOpenSelect(false);
              }}
              key={address}
              className={`p-2 justify-center items-center flex w-full rounded-2xl border-2 bg-[rgba(65,65,65)] hover:bg-gray-800  ${accountInfo.selectedAccount.address == address ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Switch back to EOA
              {/* <div className="flex grow justify-between items-center"> */}
              {/*   <div className="grow">{`${extractParts(address, 6, 4)} | 25 ETH`}</div> */}
              {/*   <Button type="submit" size="sm" className="px-3"> */}
              {/*     <span className="sr-only">Copy</span> */}
              {/*     <Copy className="h-4 w-4" /> */}
              {/*   </Button> */}
              {/* </div> */}
            </Button>
          )}
          <br />

          {safeAddress?.isFetched &&
            safeAddress?.data?.map((data) => {
              return (
                <div
                  onClick={() => {
                    setSelectedAccount(data.address, true, data.chainId);
                    setOpenSelect(false);
                  }}
                  key={data.address}
                  className={`flex w-full rounded-2xl gap-1 cursor-pointer ${data.address == accountInfo.selectedAccount.address ? "" : ""}`}
                >
                  <div
                    className={`p-2 flex rounded-2xl shadow-[0_0px_0px_1px_rgba(255,255,255,0.15)]  grow justify-between items-center  ${data.address != accountInfo?.selectedAccount?.address ? "hover:bg-[rgba(85,85,85)] bg-[rgba(65,65,65)]" : "bg-[rgba(64,150,166)]"}`}
                  >
                    <div className="grow flex justify-center">{`${extractParts(data.address, 6, 4)}`}</div>
                  </div>
                  <div
                    className={`py-2 rounded-2xl aspect-square justify-center shadow-[0_0px_0px_1px_rgba(255,255,255,0.15)] flex items-center h-full bg-[rgba(65,65,65)] hover:bg-[rgba(85,85,85)]`}
                  >
                    <FaRegCopy
                      className="h-4 w-4"
                      onClick={async () =>
                        navigator.clipboard.writeText(data.address)
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <DialogFooter className="sm:justify-start">
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpenCreate(true);
                }}
                className="bg-[rgba(65,65,65)] h-[32px] rounded-2xl  flex w-full justify-center items-center hover:bg-[rgba(55,55,55)] flex-col"
              >
                <div>Create Account</div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-[#121313] text-white border-0">
              <DialogHeader>
                <DialogTitle>Create Smart Account</DialogTitle>
              </DialogHeader>
              <div className="text-black flex items-center gap-2">
                <Input placeholder="type your smart account name" />
                {!isLoading ? (
                  <Button
                    className="w-24 bg-[rgba(65,65,65)] shadow-[0_0px_0px_1px_rgba(255,255,255,0.15)] cursor-pointer hover:bg-[rgba(45,45,45)]"
                    onClick={() => {
                      onCreateSmartAccount();
                    }}
                  >
                    Create
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-24 bg-[rgba(65,65,65)] shadow-[0_0px_0px_1px_rgba(255,255,255,0.15)] cursor-pointer hover:bg-[rgba(45,45,45)]"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Button>
                )}
              </div>
              <DialogFooter className="sm:justify-start"></DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
