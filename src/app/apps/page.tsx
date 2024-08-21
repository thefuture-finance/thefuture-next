import AppGrid, { AppGridProps } from "@/app/_components/apps/AppGrid";

export default function Apps() {
  const appGridProps: AppGridProps = {
    apps: [
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
      },
      {
        networks: [],
        category: [],
        socials: [],
        is_favorites: true,
        appUrl: "https://app.uniswap.org/",
        logo: "https://safe-transaction-assets.safe.global/safe_apps/77/icon.png",
        name: "Uniswap",
        description: "its a Uniswap",
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
