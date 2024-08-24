"use client";
import { useState, useEffect, useContext, type MutableRefObject } from "react";
import type { UseAppCommunicatorHandlers } from "@/app/_components/apps/useAppCommunicator";
import useAppCommunicator, {
  CommunicatorMessages,
} from "@/app/_components/apps/useAppCommunicator";
import type { Methods } from "@safe-global/safe-apps-sdk";
import {
  type BaseTransaction,
  type EIP712TypedData,
  type RequestId,
  type SafeSettings,
  type SendTransactionRequestParams,
} from "@safe-global/safe-apps-sdk";
import {
  getBalances,
  getSafeMessage,
  getTransactionDetails,
  type SafeAppData,
} from "@safe-global/safe-gateway-typescript-sdk";

// import type { ChainInfo as WebCoreChainInfo } from "@safe-global/safe-gateway-typescript-sdk/dist/types/chains";
// import useGetSafeInfo from "./useGetSafeInfo";
import AppCommunicator from "../services/apps/AppCommunicator";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import {
  BrowserProvider,
  TransactionRequest,
  TransactionResponse,
} from "ethers";
import { useAccountInfo } from "@/store/getAccountInfo";
import { handleTransaction } from "@/utils/smartAccount";

export const useCustomAppCommunicator = (
  iframeRef: MutableRefObject<HTMLIFrameElement | null>,
  // app: SafeAppData,
  // chain: WebCoreChainInfo | undefined,
  overrideHandlers?: Partial<UseAppCommunicatorHandlers>,
): AppCommunicator | undefined => {
  const [currentRequestId, setCurrentRequestId] = useState<
    RequestId | undefined
  >();

  const { walletProvider } = useWeb3ModalProvider();

  const { accountInfo } = useAccountInfo();

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  // accountInfo.smartAccounts.find(
  //   (account) =>
  //     account.address == accountInfo.selectedAccount.address,
  // ).ownerAddress
  // const safeMessages = { data: { results: [""] } };
  // const { setTxFlow } = useContext(TxModalContext);
  // const { safe, safeAddress } = useSafeInfo();
  // const onChainSigning = useAppSelector(selectOnChainSigning);
  const [settings, setSettings] = useState<SafeSettings>({
    offChainSigning: true,
  });
  // const appData = app;
  const onTxFlowClose = () => {
    setCurrentRequestId((prevId) => {
      if (prevId) {
        communicator?.send(
          CommunicatorMessages.REJECT_TRANSACTION_MESSAGE,
          prevId,
          true,
        );
        // trackSafeAppEvent(
        //   SAFE_APPS_EVENTS.PROPOSE_TRANSACTION_REJECTED,
        //   app.name,
        // );
      }
      return undefined;
    });
  };
  // const tokenlist = useAppSelector(selectTokenList);
  // const { balances } = useBalances();

  const communicator = useAppCommunicator(
    iframeRef,
    /* appData */ /* chain */ {
      onConfirmTransactions: async (
        txs: BaseTransaction[],
        requestId: RequestId,
        params?: SendTransactionRequestParams,
      ) => {
        if (!accountInfo.selectedAccount.isSmart) {
          const provider = new BrowserProvider(walletProvider);
          const signer = await provider.getSigner();
          const response: TransactionResponse = await signer.sendTransaction(
            txs[0],
          );

          setCurrentRequestId(requestId);
          return { safeTxHash: response.hash };
        }

        const response = await handleTransaction(
          address,
          accountInfo.selectedAccount.address,
          walletProvider,
          txs,
        );
        setCurrentRequestId(requestId);

        return { safeTxHash: response.hash };

        // const data = {
        //   app: appData,
        //   appId: appData ? String(appData.id) : undefined,
        //   requestId,
        //   txs,
        //   params,
        // };

        // trackEvent({
        //   ...SAFE_APPS_EVENTS.OPEN_TRANSACTION_MODAL,
        //   label: appData.name,
        // });
        // setTxFlow(<SafeAppsTxFlow data={data} />, onTxFlowClose);
      },
      onSignMessage: (
        message: string | EIP712TypedData,
        requestId: string,
        method: Methods.signMessage | Methods.signTypedMessage,
        sdkVersion: string,
      ) => {
        // const isOffChainSigningSupported = isOffchainEIP1271Supported(
        //   safe,
        //   chain,
        //   sdkVersion,
        // );
        // const signOffChain =
        //   isOffChainSigningSupported &&
        //   !onChainSigning &&
        //   !!settings.offChainSigning;
        //
        // setCurrentRequestId(requestId);
        //
        // if (signOffChain) {
        //   setTxFlow(
        //     <SignMessageFlow
        //       logoUri={appData?.iconUrl || ""}
        //       name={appData?.name || ""}
        //       message={message}
        //       safeAppId={appData?.id}
        //       requestId={requestId}
        //     />,
        //     onTxFlowClose,
        //   );
        // } else {
        //   setTxFlow(
        //     <SignMessageOnChainFlow
        //       props={{
        //         app: appData,
        //         requestId,
        //         message,
        //         method,
        //       }}
        //     />,
        //   );
        // }
      },
      onGetPermissions: () => [],
      onSetPermissions: () => {},
      onRequestAddressBook: () => [],
      onGetTxBySafeTxHash: (safeTxHash) =>
        getTransactionDetails(chainId, safeTxHash),
      onGetEnvironmentInfo: () => ({
        origin: document.location.origin,
      }),
      onGetSafeInfo: (event) => {
        console.log(accountInfo.selectedAccount);
        return {
          safeAddress: accountInfo.selectedAccount.address,
          chainId: accountInfo.selectedAccount.chainId,
          threshold: 1000,
          owners: [],
          isReadOnly: false,
        };
      },

      // onGetChainInfo: () => {
      //   if (!chain) return;
      //   const {
      //     nativeCurrency,
      //     chainName,
      //     chainId,
      //     shortName,
      //     blockExplorerUriTemplate,
      //   } = chain;
      //
      //   return {
      //     chainName,
      //     chainId,
      //     shortName,
      //     nativeCurrency,
      //     blockExplorerUriTemplate,
      //   };
      // },
      onSetSafeSettings: (safeSettings: SafeSettings) => {
        const newSettings: SafeSettings = {
          ...settings,
          offChainSigning: !!safeSettings.offChainSigning,
        };

        setSettings(newSettings);

        return newSettings;
      },
      onGetOffChainSignature: async (messageHash: string) => {
        // const safeMessage = safeMessages.data?.results
        //   ?.filter("") //isSafeMessageListItem
        //   ?.find((item) => item.messageHash === messageHash);
        //
        // if (safeMessage) {
        //   return safeMessage.preparedSignature;
        // }

        try {
          const { preparedSignature } = await getSafeMessage(
            chainId,
            messageHash,
          );
          return preparedSignature;
        } catch {
          return "";
        }
      },
      ...overrideHandlers,
    },
  );

  return communicator;
};
