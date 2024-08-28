import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaWallet } from "react-icons/fa6";

export default function SideBarLink({
  children,
  href,
  Name,
}: {
  href: string;
  Name: string;
  children?: ReactNode;
}) {
  const selectedPage = usePathname().replace("/", "");
  return (
    <Link
      href={`/${href}`}
      className={cn(
        "flex p-2 group-hover:pl-3 rounded-lg w-full items-center group-hover:w-full hover:bg-[rgba(60,60,60)]",
        { "bg-[rgba(50,50,50)]": selectedPage == href },
      )}
    >
      <div>{children}</div>
      <span
        className={`text-[#F7F7F7] hover:text-[#F9F9F9] text-[16px] leading-[20px] font-light ml-2 hidden group-hover:flex typing-demo w-[13ch]`}
      >
        {Name}
      </span>
    </Link>
  );
}
