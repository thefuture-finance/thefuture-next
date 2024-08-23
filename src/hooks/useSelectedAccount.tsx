import SafeApiKit from "@safe-global/api-kit";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";

export function useSelectedAccount() {
  const { chainId } = useWeb3ModalAccount();
  const [apiKit, setApiKit] = useState<SafeApiKit>();

  useEffect(() => {
    setApiKit(
      new SafeApiKit({
        chainId: BigInt(chainId ?? 1),
      }),
    );
  }, [chainId]);

  return apiKit;
}
