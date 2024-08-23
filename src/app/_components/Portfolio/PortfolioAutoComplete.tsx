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

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  onDeleteRecentSearch: (address: string) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { address: T; name: string }[];
  historyItems: { address: T; name: string }[];
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
    <div className="flex items-center w-full h-[30px]">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => {
                setOpen(e.key !== "Escape");
                if (e.key == "Enter") {
                  onSelectItem(searchValue);
                }
              }}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
              className="w-[440px]"
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
            className={`w-[--radix-popover-trigger-width] p-0 `}
          >
            <CommandList
              className={`${items?.length > 0 || !hideNotFound || searchValue?.length == 0 ? "" : "border-[0px]"}`}
            >
              {isLoading && searchValue?.length && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    {searchValue}
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {!searchValue?.length && historyItems?.length > 0 && (
                <CommandGroup>
                  {historyItems.map((option, index) => (
                    <div className="w-full flex gap-2 justify-between items-center">
                      <CommandItem
                        className="py-3"
                        key={index}
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
                        className="cursor-pointer hover:bg-gray-200 w-8 h-8 text-[#333] hover:text-[rgba(120,50,50)]"
                      >
                        <DeleteSvg className=" w-full h-full" />
                      </div>
                    </div>
                  ))}
                </CommandGroup>
              )}
              {searchValue?.length > 0 && items?.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option, index) => (
                    <CommandItem
                      className="py-3"
                      key={index}
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
