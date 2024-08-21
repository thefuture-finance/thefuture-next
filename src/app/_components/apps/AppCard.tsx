import Link from "next/link";
import Image from "next/image";

type Networks = "scroll" | "ethereum" | "polygon";

type Category =
  | "Defi"
  | "Fundraising"
  | "Dashboard"
  | "Lending/Borrowing"
  | "Staking"
  | "Bridge";

type Socials =
  | `https://discord.com/invite/${string}`
  | `https://x.com/${string}`
  | `https://github.com/${string}`;

export type AppCardData = {
  networks: Networks[];
  category: Category[];
  socials: Socials[];
  is_favorites: boolean;
  appUrl: string;
  description: string;
  logo: string;
  name: string;
};
export default function AppCard({
  networks,
  category,
  socials,
  is_favorites,
  logo,
  name,
  appUrl,
  description,
}: AppCardData) {
  return (
    <>
      <Link
        href={`/app?appUrl=${appUrl}`}
        className="bg-gray-500 min-w-[248px] max-w-[400px] h-[228px] lg:h-[280px] rounded flex flex-col hover:bg-[rgba(97,104,118)] hover:border-[#CDC1B0] border-[rgba(0,0,0,0)] border-2"
      >
        <div className="px-4 pt-6">
          <Image
            alt={name}
            src={logo}
            className="w-12 h-12"
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col p-4 pb-6">
          <span className="text-lg">{name}</span>
          <span className="text-sm">{description}</span>
          <div className="flex flex-wrap gap-2 pt-4 auto-fill-100">
            {category.map((categoryName, index) => {
              return (
                <span
                  key={index}
                  className="bg-gray-600 rounded shrink px-3 flex text-[13px] leading-[22px]"
                >
                  {categoryName}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </>
  );
}
