import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import DeleteSvg from "~/public/close.svg";
import { SearchedAddress } from "@/store/getAccountInfo";

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  onDeleteRecentSearch: (address: string) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { address: T; name: string }[];
  historyItems: SearchedAddress[];
  hideNotFound?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
};

export default function PortfolioAutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  onDeleteRecentSearch,
  historyItems,
  items,
  hideNotFound = true,
  isLoading,
  emptyMessage = "No items.",
  placeholder = "Search...",
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.address] = item.name;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [items],
  );

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      labels[selectedValue] !== searchValue
    ) {
      onSearchValueChange(labels[selectedValue]);
    }
  };

  const onSelectItem = (inputValue: string) => {
    onSelectedValueChange(inputValue as T);
    onSearchValueChange("");
    setOpen(false);
  };

  return (
    <div className="flex w-[470px] items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => {
                setOpen(e.key !== "Escape");
                console.log(searchValue);
                if (e.key == "Enter" && !items?.length) {
                  onSelectItem(searchValue);
                }
              }}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
              className="text-white w-full bg-[rgba(25,25,25)] p-3"
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className={`w-[--radix-popover-trigger-width] p-0 bg-[rgba(25,25,25)] `}
          >
            <CommandList
              className={`${!!items?.length || !hideNotFound || !searchValue?.length ? "" : "border-[0px]"}`}
            >
              {isLoading && !!searchValue?.length && (
                <CommandPrimitive.Loading>
                  <div className="p-1 text-[#F7F7F7]">
                    {searchValue}
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {!searchValue?.length && !!historyItems?.length && (
                <CommandGroup>
                  {historyItems.map((option, index) => (
                    <div
                      key={index}
                      className="w-full flex gap-2 justify-between items-center pr-2"
                    >
                      <CommandItem
                        className={`flex py-3 text-[#F7F7F7] bg-[rgba(32,32,32)] grow ${
                          selectedValue === option.address
                            ? "bg-[rgba(32,32,32)]"
                            : "bg-[rgba(25,25,25)]"
                        }`}
                        value={option?.address}
                        onMouseDown={(e) => e.preventDefault()}
                        onSelect={onSelectItem}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue === option.address
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option?.name || option?.address}
                      </CommandItem>
                      <div
                        onClick={() => onDeleteRecentSearch(option.address)}
                        className="shrink-0 cursor-pointer hover:bg-gray-200 w-8 h-8 text-[#333] hover:text-[rgba(120,50,50)] rounded"
                      >
                        <DeleteSvg className=" w-full h-full" />
                      </div>
                    </div>
                  ))}
                </CommandGroup>
              )}
              {!!searchValue?.length && !!items?.length && !isLoading ? (
                <CommandGroup>
                  {items.map((option, index) => (
                    <CommandItem
                      className={`py-3 text-[#F7F7F7] bg-[rgba(32,32,32)] ${
                        selectedValue === option.address
                          ? "bg-[rgba(32,32,32)]"
                          : "bg-[rgba(25,25,25)]"
                      }`}
                      key={index}
                      value={option?.address}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-white",
                          selectedValue === option.address
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option?.name || option?.address}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading && !hideNotFound ? (
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
