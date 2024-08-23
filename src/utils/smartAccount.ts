import { Eip1193Provider, ethers } from "ethers";
import Safe, { SafeFactory } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { PredictedSafeProps } from "@safe-global/protocol-kit";
import { SafeAccountConfig } from "@safe-global/protocol-kit";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types";
import { BaseTransaction } from "@safe-global/safe-apps-sdk";

export async function createSmartAccount(
  address: string,
  walletProvider: Eip1193Provider,
) {
  const safeFactory = await SafeFactory.init({
    provider: walletProvider,
  });
  /* This Safe is tied to owner 1 because the factory was initialized with the owner 1 as the signer. */
  const safeAccountConfig: SafeAccountConfig = {
    owners: [address],
    threshold: 1,
  };

  const protocolKit = await safeFactory.deploySafe({
    safeAccountConfig,
  });
  const safeAddress = await protocolKit.getAddress();
  return safeAddress;
}
export async function handleTransaction(
  address: string,
  safeAddress: string,
  walletProvider: Eip1193Provider,
  transactions: BaseTransaction[],
) {
  let protocolKit = await Safe.init({
    provider: walletProvider,
    signer: address,
    safeAddress: safeAddress,
  });

  const safeTransaction = await protocolKit.createTransaction({
    transactions,
  });

  const txResponse = await protocolKit.executeTransaction(safeTransaction);

  const receipt = await txResponse.transactionResponse?.wait();

  return receipt;
}
