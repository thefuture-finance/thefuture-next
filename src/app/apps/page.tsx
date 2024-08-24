import AppGrid, { AppGridProps } from "@/app/_components/apps/AppGrid";

export default function Apps() {
  const appGridProps: AppGridProps = {
    apps: [
      {
        networks: ["scroll"],
        category: ["Defi", "Lending/Borrowing"],
        socials: [
          "https://x.com/aaveaave",
          "https://github.com/aave",
          "https://discord.com/invite/CvKUrqM",
        ],
        is_favorites: false,
        appUrl: "https://app.aave.com&marketName=proto_scroll_sepolia_v3",
        logo: "/assets/images/aaveLogo.png",
        name: "Aave v3",
        description: "Non-custodial liquidity protocol",
      },
      {
        networks: ["scroll"],
        category: ["Defi", "Staking"],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "/assets/images/lidoLogo.png",
        name: "Lido Staking",
        description: "Lido is the liquid staking solution for Ethereum.",
      },
      {
        networks: ["scroll", "ethereum"],
        category: ["Bridge"],
        socials: [],
        is_favorites: true,
        appUrl: "https://www.asteriafinance.com/tr/scroll-sepolia",
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
