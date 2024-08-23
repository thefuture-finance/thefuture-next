"use client";
import type { MutableRefObject } from "react";
import { useEffect, useMemo, useState } from "react";
import { getAddress } from "ethers";
import type {
  SafeAppData,
  ChainInfo as WebCoreChainInfo,
  TransactionDetails,
} from "@safe-global/safe-gateway-typescript-sdk";
import type {
  AddressBookItem,
  BaseTransaction,
  EIP712TypedData,
  EnvironmentInfo,
  GetBalanceParams,
  GetTxBySafeTxHashParams,
  RequestId,
  RPCPayload,
  SendTransactionRequestParams,
  SendTransactionsParams,
  SignMessageParams,
  SignTypedMessageParams,
  ChainInfo,
} from "@safe-global/safe-apps-sdk";
import { Methods, RPC_CALLS } from "@safe-global/safe-apps-sdk";
import type { SafeSettings } from "@safe-global/safe-apps-sdk";
import AppCommunicator from "@/services/apps/AppCommunicator";
import { Errors, logError } from "@/services/exception/exceptions";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
export type SafePermissionsRequest = {
  origin: string;
  requestId: string;
  request: any[];
};

export enum CommunicatorMessages {
  REJECT_TRANSACTION_MESSAGE = "Transaction was rejected",
}

type JsonRpcResponse = {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: string;
};

export type UseAppCommunicatorHandlers = {
  onConfirmTransactions: (
    txs: BaseTransaction[],
    requestId: RequestId,
    params?: SendTransactionRequestParams,
  ) => void;
  onSignMessage: (
    message: string | EIP712TypedData,
    requestId: string,
    method: Methods.signMessage | Methods.signTypedMessage,
    sdkVersion: string,
  ) => void;
  onGetTxBySafeTxHash: (transactionId: string) => Promise<TransactionDetails>;
  onGetEnvironmentInfo: () => EnvironmentInfo;
  // onGetSafeBalances?: (currency: string) => Promise<SafeBalances>;
  // onGetSafeInfo?: () => SafeInfoExtended;
  onGetChainInfo: () => ChainInfo | undefined;
  onGetPermissions: (origin: string) => any[];
  onSetPermissions: (permissionsRequest?: SafePermissionsRequest) => void;
  onRequestAddressBook: (origin: string) => AddressBookItem[];
  onSetSafeSettings: (settings: SafeSettings) => SafeSettings;
  onGetOffChainSignature: (messageHash: string) => Promise<string | undefined>;
};

const useAppCommunicator = (
  iframeRef: MutableRefObject<HTMLIFrameElement | null>,
  // app: SafeAppData | undefined,
  // chain: WebCoreChainInfo | undefined,
  handlers: any,
): AppCommunicator | undefined => {
  const [communicator, setCommunicator] = useState<AppCommunicator | undefined>(
    undefined,
  );
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    let communicatorInstance: AppCommunicator;

    const initCommunicator = (
      iframeRef: MutableRefObject<HTMLIFrameElement | null>,
      // app?: SafeAppData,
    ) => {
      communicatorInstance = new AppCommunicator(iframeRef, {
        onMessage: (msg) => {
          if (!msg.data) return;

          // const isCustomApp = app && app.id < 1;

          // trackSafeAppEvent(
          //   { ...SAFE_APPS_EVENTS.SAFE_APP_SDK_METHOD_CALL },
          //   isCustomApp ? app?.url : app?.name || '',
          //   {
          //     method: msg.data.method,
          //     ethMethod: (msg.data.params as any)?.call,
          //     version: msg.data.env.sdkVersion,
          //   },
          // )
        },
        onError: (error) => {
          logError(Errors._901, error.message);
        },
      });

      setCommunicator(communicatorInstance);
    };

    // if (app) {
    initCommunicator(iframeRef);
    // }

    return () => {
      communicatorInstance?.clear();
    };
  }, [iframeRef]);

  // Adding communicator logic for the required SDK Methods
  // We don't need to unsubscribe from the events because there can be just one subscription
  // per event type and the next effect run will simply replace the handlers
  useEffect(() => {
    communicator?.on(Methods.getTxBySafeTxHash, (msg) => {
      const { safeTxHash } = msg.data.params as GetTxBySafeTxHashParams;

      return handlers.onGetTxBySafeTxHash(safeTxHash);
    });

    communicator?.on(Methods.getEnvironmentInfo, handlers.onGetEnvironmentInfo);

    communicator?.on(Methods.getSafeInfo, handlers.onGetSafeInfo);

    communicator?.on(Methods.getSafeBalances, (msg) => {
      const { currency = "usd" } = msg.data.params as GetBalanceParams;

      return handlers.onGetSafeBalances(currency);
    });

    communicator?.on(Methods.rpcCall, async (msg) => {
      const params = msg.data.params as RPCPayload;

      if (params.call === RPC_CALLS.safe_setSettings) {
        const settings = params.params[0] as SafeSettings;
        return handlers.onSetSafeSettings(settings);
      }

      if (!walletProvider) {
        throw new Error("SafeAppWeb3Provider is not initialized");
      }

      try {
        return await walletProvider.request({
          method: params.call,
          params: params.params,
        });
      } catch (err) {
        console.log(err);
        throw new Error((err as JsonRpcResponse).error);
      }
    });

    communicator?.on(Methods.sendTransactions, async (msg) => {
      console.log("send transaction");
      const { txs, params } = msg.data.params as SendTransactionsParams;

      const transactions = txs.map<BaseTransaction>(({ to, value, data }) => {
        return {
          to: getAddress(to),
          value: value ? BigInt(value).toString() : "0",
          data: data || "0x",
        };
      });

      return await handlers.onConfirmTransactions(
        transactions,
        msg.data.id,
        params,
      );
    });

    communicator?.on(Methods.signMessage, (msg) => {
      const { message } = msg.data.params as SignMessageParams;
      const sdkVersion = msg.data.env.sdkVersion;
      handlers.onSignMessage(
        message,
        msg.data.id,
        Methods.signMessage,
        sdkVersion,
      );
    });

    communicator?.on(Methods.getOffChainSignature, (msg) => {
      return handlers.onGetOffChainSignature(msg.data.params as string);
    });

    communicator?.on(Methods.signTypedMessage, (msg) => {
      const { typedData } = msg.data.params as SignTypedMessageParams;
      const sdkVersion = msg.data.env.sdkVersion;
      handlers.onSignMessage(
        typedData,
        msg.data.id,
        Methods.signTypedMessage,
        sdkVersion,
      );
    });

    communicator?.on(Methods.getChainInfo, handlers.onGetChainInfo);

    communicator?.on(Methods.wallet_getPermissions, (msg) => {
      return handlers.onGetPermissions(msg.origin);
    });

    communicator?.on(Methods.wallet_requestPermissions, (msg) => {
      handlers.onSetPermissions({
        origin: msg.origin,
        request: msg.data.params as any[],
        requestId: msg.data.id,
      });
    });

    communicator?.on(Methods.requestAddressBook, (msg) => {
      return handlers.onRequestAddressBook(msg.origin);
    });
  }, [walletProvider, handlers, communicator]);

  return communicator;
};

export default useAppCommunicator;
