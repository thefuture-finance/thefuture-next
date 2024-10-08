"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId from https://cloud.walletconnect.com

export const projectId = "46ddd9c087e8a513d84bcb09d5084313";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org",
};

const scroll = {
  chainId: 534352,
  name: "Scroll",
  currency: "ETH",
  explorerUrl: "https://scrollscan.com/",
  rpcUrl: "https://rpc.scroll.io",
};

const scroll_sepolia = {
  chainId: 534351,
  name: "Scroll Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.scrollscan.com/",
  rpcUrl: "https://sepolia-rpc.scroll.io",
};

const optimism = {
  chainId: 10,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://optimistic.etherscan.io",
  rpcUrl: "	https://mainnet.optimism.io",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 534351, // used for the Coinbase SDK
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  defaultChain: scroll_sepolia,
  chains: [scroll_sepolia, scroll],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  chainImages: {
    534351: "/assets/images/scroll.png",
    534352: "/assets/images/scroll.png",
  },
});

export function AppKit({ children }) {
  return children;
}
