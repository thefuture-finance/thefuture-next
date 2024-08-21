import Link from "next/link";

export type AppCardData = {
  networks: string[];
  category: string[];
  socials: string[];
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
        className="bg-gray-500 min-w-[248px] h-[228px] lg:h-[280px] rounded flex flex-col"
      >
        <div>
          <img src={logo} className="w-12 h-12" />
        </div>
        <div></div>
      </Link>
    </>
  );
}
