"use client";
import AppGrid, { AppGridProps } from "@/app/_components/apps/AppGrid";

export default function Apps() {
  const appGridProps: AppGridProps = {
    apps: [
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://scroll.layerbank.finance/",
        logo: "/assets/images/nuriExchange.svg",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://compound.finance/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://www.cog.finance/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://www.rhomarkets.xyz/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://zebra.xyz/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://syncswap.xyz/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://oku.trade/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://izumi.finance/trade/swap",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://www.nuri.exchange/",
        logo: "/assets/images/aaveLogo.png",
        name: "Nuri Exchange",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [],
        is_favorites: false,
        appUrl: "https://scroll.ambient.finance/",
        logo: "/assets/images/aaveLogo.png",
        name: "Ambient",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [
          "https://x.com/aaveaave",
          "https://github.com/aave",
          "https://discord.com/invite/CvKUrqM",
        ],
        is_favorites: false,
        appUrl: "https://app.aave.com",
        logo: "/assets/images/aaveLogo.png",
        name: "Aave v3",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Staking"],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org",
        logo: "/assets/images/lidoLogo.png",
        name: "Lido Staking",
        description: "Lido is the liquid staking solution for Ethereum.",
      },
      {
        networks: ["scroll", "ethereum"],
        category: ["Bridge"],
        socials: [],
        is_favorites: true,
        appUrl: "https://www.asteriafinance.com",
        logo: "/assets/images/scrollLogo.png",
        name: "Scroll Bridge",
        description: "Scroll Bridge is the native Bridge in Scroll",
      },
    ],
  };
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-full flex">
          <AppGrid apps={appGridProps.apps} />
        </div>
      </div>
    </>
  );
}
