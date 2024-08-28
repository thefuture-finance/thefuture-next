import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function SideBarLinkComing({
  children,
  href,
  name,
}: {
  href: string;
  name: string;
  children?: ReactNode;
}) {
  const selectedPage = usePathname().replace("/", "");
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="flex">
        <div
          className={cn(
            "flex p-2 group-hover:pl-3 rounded-lg w-full items-center group-hover:w-full hover:bg-[rgba(35,35,35)]",
            { "bg-[rgba(50,50,50)]": selectedPage == href },
          )}
        >
          {children}
          <span className="text-[#F7F7F7] hover:text-[#F9F9F9] text-[16px] leading-[20px] font-light ml-2 hidden group-hover:flex typing-demo w-[13ch]">
            {name}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-50 p-2 bg-[#0E0C12] text-[#F7F7F7]">
        <div className="flex">Coming Soon</div>
      </HoverCardContent>
    </HoverCard>
  );
}
