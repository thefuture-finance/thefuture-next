import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Education({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-[1200px] flex flex-col items-center mt-16 gap-6">
          <div className="flex w-fit p-1 h-max space-x-4 bg-[#0E0C12] text-[rgba(168,168,168)] rounded-xl font-semibold">
            <Link
              href="/education?detail=allcourses"
              className={cn(
                "shadow-tab-shadow text-xs leading-15 rounded-xl cursor-pointer font-bold py-4 px-4 md:px-8 flex justify-center items-center",
                {
                  "bg-black": searchParams.detail == "allcourses",
                  "text-[rgba(205,193,176)]":
                    searchParams.detail == "allcourses",
                  "hover:bg-gray-700": searchParams.detail != "allcourses",
                },
              )}
            >
              All Courses
            </Link>
            <Link
              href="/education?detail=started"
              className={cn(
                "shadow-tab-shadow text-xs leading-15 rounded-xl cursor-pointer font-bold py-4 px-4 md:px-8 flex justify-center items-center",
                {
                  "bg-black": searchParams.detail == "started",
                  "text-[rgba(205,193,176)]": searchParams.detail == "started",
                  "hover:bg-gray-700": searchParams.detail != "started",
                },
              )}
            >
              Started
            </Link>
            <Link
              href="/education?detail=completed"
              className={cn(
                "shadow-tab-shadow text-xs leading-15 rounded-xl cursor-pointer font-bold py-4 px-4 md:px-8 flex justify-center items-center",
                {
                  "bg-black": searchParams.detail == "completed",
                  "text-[rgba(205,193,176)]":
                    searchParams.detail == "completed",
                  "hover:bg-gray-700": searchParams.detail != "completed",
                },
              )}
            >
              Completed
            </Link>
            <Link
              href="/education?detail=myshares"
              className={cn(
                "shadow-tab-shadow text-xs leading-15 rounded-xl cursor-pointer font-bold py-4 px-4 md:px-8 flex justify-center items-center",
                {
                  "bg-black": searchParams.detail == "myshares",
                  "text-[rgba(205,193,176)]": searchParams.detail == "myshares",
                  "hover:bg-gray-700": searchParams.detail != "myshares",
                },
              )}
            >
              My Shares
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center md:justify-start lg:justify-around items-center">
              <div className="cursor-pointer min-w-32 mt-4 lg:mt-0 h-max py-2 mr-4 font-bold border rounded-full text-center text-black border-[rgba(168,168,168)] hover:bg-[rgba(50,50,50)]">
                Crypto
              </div>
              <div className="cursor-pointer min-w-32 mt-4 lg:mt-0 h-max py-2 mr-4 font-bold border rounded-full text-center text-black border-[rgba(168,168,168)] hover:bg-[rgba(50,50,50)]">
                Crypto
              </div>
              <div className="cursor-pointer min-w-32 mt-4 lg:mt-0 h-max py-2 mr-4 font-bold border rounded-full text-center text-black border-[rgba(168,168,168)] hover:bg-[rgba(50,50,50)]">
                Crypto
              </div>
              <div className="cursor-pointer min-w-32 mt-4 lg:mt-0 h-max py-2 mr-4 font-bold border rounded-full text-center text-black border-[rgba(168,168,168)] hover:bg-[rgba(50,50,50)]">
                Crypto
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl text-[#F7F7F7]">Cooming Soon...</span>
          </div>
          <div className="w-full flex flex-col">
            <span className="ml-10 text-2xl text-[#F7F7F7]">Courses</span>
            <div className="grid-container p-8 w-full auto-rows-min">
              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>

              <div className="bg-[rgba(32,32,32)] h-[248px] rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
