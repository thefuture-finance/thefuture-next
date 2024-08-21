"use client";
import { Bridge } from "@socket.tech/plugin";
import { useEffect, useState } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, ethers, formatUnits } from "ethers";

export function SocketBridge() {
  type CustomizationProps = {
    width: number;
    responsiveWidth: boolean;
    borderRadius: number;
    accent: string;
    onAccent: string;
    primary: string;
    secondary: string;
    text: string;
    secondaryText: string;
    interactive: string;
    onInteractive: string;
    outline: string;
    fontFamily: string;
  };

  const customize: CustomizationProps = {
    width: 420,
    responsiveWidth: false,
    borderRadius: 0.6,
    accent: "rgb(131,249,151)",
    onAccent: "rgb(0,0,0)",
    primary: "rgb(37,37,37)",
    secondary: "rgb(65,65,65)",
    text: "rgb(247,247,247)",
    secondaryText: "rgb(200,200,200)",
    interactive: "rgb(85,85,85)",
    onInteractive: "rgb(55,55,55)",
    outline: "rgb(18,26,91)",
    fontFamily: "Courier New",
  };

  const [provider, setProvider] = useState<any>(null);
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (walletProvider) {
      setProvider(new BrowserProvider(walletProvider));
    }
  }, [walletProvider]);
  const sourceNetworks = [1, 534352];
  const destinationNetworks = [1, 534352];
  return (
    <Bridge
      API_KEY="72a5b4b0-e727-48be-8aa1-5da9d62fe635" // test api key
      provider={provider}
      sourceNetworks={sourceNetworks}
      destNetworks={destinationNetworks}
      defaultSourceNetwork={1}
      defaultDestNetwork={534352}
      enableSameChainSwaps
      enableRefuel={true}
      customize={customize}
    />
  );
}

export default SocketBridge;
