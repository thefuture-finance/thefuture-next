"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  TableMeta,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { CoinData, getCoinData } from "@/server/action";
import { roundNumber, roundPrice } from "@/utils/formatters";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import { getQueryKey } from "@trpc/react-query";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { serverClient } from "@/app/_trpc/serverClient";
import { zeroFormatterHtml } from "@/app/_utils/htmlFormatters";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    setFavorite: (isFavorite: boolean, id: string) => void;
    getFavorite: () => string[];
  }
}

export const columns: ColumnDef<CoinData>[] = [
  {
    accessorKey: "image",
    cell: ({ row, table }) => {
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
    header: () => {
      return null;
    },
  },

  {
    accessorKey: "assetName",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("assetName")}</div>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">
        {zeroFormatterHtml(roundPrice(row.getValue("price")), 4)}
      </div>
    ),
  },
  {
    accessorKey: "hour1",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          1 Hour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`font-medium ${row.getValue<number>("hour1") < 0 ? "text-red-300" : ""}`}
        >
          {Math.abs(Number(roundNumber(row.getValue("hour1"), 2))) + "%"}
        </div>
      );
    },
  },
  {
    accessorKey: "hour24",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          24 Hour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={
            "font-medium " +
            (row.getValue<number>("hour24") < 0 ? "text-red-300" : "")
          }
        >
          {Math.abs(Number(roundNumber(row.getValue("hour24"), 2))) + "%"}
        </div>
      );
    },
  },
  {
    accessorKey: "day7",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          7 Days
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={
            "font-medium " +
            (row.getValue<number>("day7") < 0 ? "text-red-300" : "")
          }
        >
          {Math.abs(Number(roundNumber(row.getValue("day7"), 2))) + "%"}
        </div>
      );
    },
  },
  {
    accessorKey: "day30",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          30 Days
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={
            "font-medium " +
            (row.getValue<number>("day30") < 0 ? "text-red-300" : "")
          }
        >
          {Math.abs(Number(roundNumber(row.getValue("day30"), 2))) + "%"}
        </div>
      );
    },
  },
  {
    accessorKey: "marketcap",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center text-[rgba(247, 247, 247,0.8)] cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Market Cap
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium flex justify-end">
          ${Number(row.getValue("marketcap")).toLocaleString("en-GB")}
        </div>
      );
    },
  },
  {
    accessorKey: "isfavorite",
    cell: ({ row, table }) => {
      const handleRemove = (event) => {
        event.stopPropagation();
        table.options.meta?.setFavorite(false, row.getValue("assetName"));
      };
      const handleAdd = (event) => {
        event.stopPropagation();
        table.options.meta?.setFavorite(true, row.getValue("assetName"));
      };
      const getFavorites = () => {
        return table?.options?.meta?.getFavorite() || [];
      };

      return (
        <div className="z-20">
          {getFavorites().includes(row.getValue("assetName")) ? (
            <FaStar className="cursor-pointer w-8 h-8" onClick={handleRemove} />
          ) : (
            <FaRegStar className="cursor-pointer w-8 h-8" onClick={handleAdd} />
          )}
        </div>
      );
    },
    header: () => {
      return null;
    },
  },
];

export default function ExploreTable({
  initialData,
}: {
  initialData: CoinData[];
}) {
  const { data, error }: Partial<UseQueryResult<CoinData[], Error>> = useQuery({
    queryKey: ["coinData"],
    queryFn: async () => {
      return await getCoinData();
    },
    initialData,
    refetchInterval: 3000,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { address } = useWeb3ModalAccount();
  const utils = trpc.useUtils();
  const favorites = trpc.favoritesRouter.listFavorites.useQuery();
  type favoriteType = Awaited<
    ReturnType<(typeof serverClient)["favoritesRouter"]["listFavorites"]>
  >;

  const addFavoriteMutation = trpc.favoritesRouter.addFavorite.useMutation({
    onMutate: async (newFav: { id: string }) => {
      await utils.favoritesRouter.listFavorites.cancel();
      const previousFav = utils.favoritesRouter.listFavorites.getData();
      utils.favoritesRouter.listFavorites.setData(
        undefined,
        (old: favoriteType) => {
          return [...old, { accountId: address, favoriteId: newFav.id }];
        },
      );

      return { previousFav };
    },
    onError: (err, newFav, context) => {
      utils.favoritesRouter.listFavorites.setData(
        undefined,
        context.previousFav,
      );
    },
    onSettled: () => {
      utils.favoritesRouter.listFavorites.invalidate();
    },
  });
  const removeFavoriteMutation =
    trpc.favoritesRouter.removeFavorite.useMutation({
      onMutate: async (newFav: { id: string }) => {
        await utils.favoritesRouter.listFavorites.cancel();
        const previousFav = utils.favoritesRouter.listFavorites.getData();
        utils.favoritesRouter.listFavorites.setData(
          undefined,
          (old: favoriteType) => {
            return old?.filter((fav) => {
              return fav.favoriteId != newFav.id;
            });
          },
        );
        return { previousFav };
      },
      onError: (err, newFav, context) => {
        utils.favoritesRouter.listFavorites.setData(
          undefined,
          context.previousFav,
        );
      },
      onSettled: () => {
        utils.favoritesRouter.listFavorites.invalidate();
      },
    });

  const table = useReactTable({
    data,
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
    meta: {
      setFavorite: (isFavorite: boolean, id: string) => {
        if (isFavorite) {
          const data = addFavoriteMutation.mutate({ id });
          console.log(data);
          return;
        }
        const data = removeFavoriteMutation.mutate({ id });
        console.log(data);
      },
      getFavorite: () => {
        return favorites?.data?.map((favorite) => {
          return favorite.favoriteId;
        });
      },
    },
  });

  return (
    <div className="bg-[rgba(37,37,37,0.8)] w-full flex flex-col grow border rounded-md  text-[#FFF] bg-[rgba(25,25,25)]  border-[rgba(247,247,247,0.7)] shadow-xl">
      <div>
        <Table>
          <TableHeader className="text-[rgba(247, 247, 247)]">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-[rgba(247,247,247,0.7)] hover:bg-[rbga(32,32,32)]"
              >
                {headerGroup.headers?.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter((row) => {
                  return favorites.data
                    ?.map((fav) => {
                      return fav.favoriteId;
                    })
                    .includes(row.getValue("assetName"));
                })
                ?.map((row, index) => (
                  <TableRow
                    className="relative h-16 rounded-xl text-md cursor-pointer border-[rgba(247,247,247,0.7)]"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => router.push(`/tokens/${data[index].id}`)}
                  >
                    {row
                      .getVisibleCells()
                      ?.map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
