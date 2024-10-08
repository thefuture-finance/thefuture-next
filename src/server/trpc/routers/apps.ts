import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appsRouter = router({
  getApps: publicProcedure.query(async () => {
    return [
      {
        networks: ["scroll"],
        category: ["Bridge"],
        socials: [],
        isAutoConnect: true,
        appUrl: "https://www.asteriafinance.com",
        logo: "/assets/images/asteria.png",
        name: "Asteria",
        description:
          "Decentralized exchange powered by Liquidity Book, revolutionizing AMM protocols on Scroll.",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [
          "https://x.com/aaveaave",
          "https://github.com/aave",
          "https://discord.com/invite/CvKUrqM",
        ],
        isAutoConnect: true,
        appUrl: "https://app.aave.com/%3FmarketName=proto_scroll_sepolia_v3",
        logo: "/assets/images/aaveLogo.png",
        name: "Aave v3",
        description: "Non-custodial liquidity protocol",
      },

      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://scroll.ambient.finance/",
        logo: "/assets/images/ambient.png",
        name: "Ambient",
        description:
          "Ambient is built for diversified, sustainable liquidity that fixes the broken LP economics of AMMs.",
      },

      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://compound.finance/",
        logo: "/assets/images/compound.png",
        name: "Compound Finance",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://www.cog.finance/deposit",
        logo: "/assets/images/cogfinance.png",
        name: "Cog finance",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://dapp.rhomarkets.xyz/",
        logo: "/assets/images/rhomarkets.png",
        name: "Rhomarkets",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://app.zebra.xyz/#/swap",
        logo: "/assets/images/zebra.png",
        name: "Zebra",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://syncswap.xyz/",
        logo: "/assets/images/syncswap.png",
        name: "SyncSwap",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://izumi.finance/trade/swap",
        logo: "/assets/images/izumi.png",
        name: "Izumi Finance",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        isAutoConnect: false,
        appUrl: "https://www.nuri.exchange/",
        logo: "/assets/images/nuri.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
    ];
  }),
});
