"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { useRouter } from "next/navigation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getPortfolioData,
  PortfolioAssetData,
  PortfolioData,
} from "@/server/action";

import { useSpinnerStore } from "@/store/spinner";
import { isSmaller, roundNumber, roundPrice } from "@/utils/formatters";
import { useEffect } from "react";
import PortfolioTableSkeleton from "./PortfolioTableSkeleton";
import { Skeleton } from "../ui/skeleton";

import Image from "next/image";

export const columns: ColumnDef<PortfolioAssetData>[] = [
  {
    accessorKey: "image",
    header: () => {
      return null;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full aspect-square flex justify-center items-center mr-[-16px]">
          <Image
            width={32}
            height={32}
            alt="scroll"
            src={row.getValue("image")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("name")}</div>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">{roundPrice(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">{roundPrice(row.getValue("balance"))}</div>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">{roundPrice(row.getValue("value"))}</div>
    ),
  },
  {
    accessorKey: "percent_1d",
  },
  {
    accessorKey: "symbol",
  },
];

export default function PortfolioTable({
  initialData,
  address,
}: {
  initialData: PortfolioData | null;
  address: String;
}) {
  const { data, isFetching }: Partial<UseQueryResult<PortfolioData, Error>> =
    useQuery({
      queryKey: ["portfolioData", address],
      queryFn: async () => {
        return await getPortfolioData(address);
      },
      initialData,
      refetchInterval: 40000,
    });

  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data?.assets,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full flex flex-col grow">
      <div className="flex flex-col gap-4">
        {isFetching && initialData == null ? (
          <div>
            <div className="h-24 text-center">
              <Skeleton className="w-full h-16" />
            </div>
          </div>
        ) : table?.getRowModel()?.rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <div
              className="p-3 flex justify-between text-xl cursor-pointer hover:bg-[#272727] bg-[rgba(29,29,32)] text-white"
              key={index}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => router.push(`/tokens/${data.assets[index].id}`)}
            >
              <div className="basis-1/2 flex flex-col gap-2">
                <span className="flex text-[14px] leading-[21px] items-center">
                  <Image
                    alt="scroll"
                    src="/assets/images/scrollLogo.png"
                    className="w-4 h-4 mr-[5px]"
                    width={16}
                    height={16}
                  />
                  Scroll
                </span>
                <div className="flex gap-3">
                  <span className="border border-[rgba(63,63,63)] bg-[rgba(40,40,45)] rounded-lg text-[16px] leading-[24px] py-1 px-2 font-semibold">
                    ${roundPrice(row.getValue("value")) || "--"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="leading-[24px] text-[16px] font-semibold">
                      {row.getValue("name")}
                    </span>
                    <span className="leading-[21px] text-[14px] font-normal">
                      {row.getValue<string>("symbol")?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="basis-1/2 flex justify-end items-center">
                <div className="w-[500px] flex gap-1 items-center">
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-[rgba(121, 121, 121)]">
                      AMOUNT
                    </span>
                    <span className="leading-[21px] text-[14px]">
                      {isSmaller(row.getValue("balance"), 0.1, 2)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-[rgba(121, 121, 121)]">
                      PRICE USD
                    </span>
                    <span className="leading-[21px] text-[14px]">
                      ${roundPrice(row.getValue("price"))}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-[rgba(121, 121, 121)]">
                      1H
                    </span>
                    <span
                      className={`leading-[21px] text-[14px] ${row.getValue<number>("percent_1d") < 0 ? "text-red-300" : ""}`}
                    >
                      {roundNumber(row.getValue("percent_1d"), 2) || "--" + "%"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-[rgba(121, 121, 121)]">
                      24H
                    </span>
                    <span
                      className={`leading-[21px] text-[14px] ${row.getValue<number>("percent_1d") < 0 ? "text-red-300" : ""}`}
                    >
                      {roundNumber(row.getValue("percent_1d"), 2) || "--" + "%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="h-24 text-center">There is no assets</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4"></div>
    </div>
  );
}
