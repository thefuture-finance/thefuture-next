import { create } from "zustand";

export type SearchedAddress = {
  address: string;
  name?: string;
};

export type SmartAccountInfo = {
  address: string;
  ownerAddress: string;
  network: string;
};

export type SelectedAccountInfo = {
  address: string;
  isSmart: boolean;
  chainId: string;
};

export type GetAccountInfo = {
  accountInfo: {
    isLogged: boolean;
    recentSearches: SearchedAddress[];
    smartAccounts: SmartAccountInfo[];
    selectedAccount: SelectedAccountInfo;
    mainAccountAddress: string;
  };
  setIsLogged: (isLogged: boolean) => void;
  setSelectedAccount: (
    address: string,
    isSmart: boolean,
    chainId: string,
  ) => void;
  addRecentSearch: (newSearch: SearchedAddress) => void;
  setRecentSearches: (searches: SearchedAddress[]) => void;
  removeRecentSearch: (address: string) => void;
  setSmartAccounts: (smartAccounts: SmartAccountInfo[]) => void;
};

export const useAccountInfo = create<GetAccountInfo>((set) => ({
  accountInfo: {
    isLogged: false,
    recentSearches: [],
    smartAccounts: [],
    selectedAccount: {
      address: "",
      isSmart: false,
      chainId: "",
    },
    mainAccountAddress: "",
  },
  setIsLogged: (isLogged: boolean) => {
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        isLogged,
      },
    }));
  },
  setSelectedAccount: (address: string, isSmart: boolean, chainId: string) => {
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        selectedAccount: { address, isSmart, chainId },
      },
    }));
  },
  addRecentSearch: (newSearch: SearchedAddress) => {
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        recentSearches: [...state.accountInfo.recentSearches, newSearch],
      },
    }));
  },
  setRecentSearches: (searches: SearchedAddress[]) =>
    set((state) => ({
      accountInfo: { ...state.accountInfo, recentSearches: searches },
    })),
  removeRecentSearch: (address: string) =>
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        recentSearches: state.accountInfo.recentSearches.filter(
          (search) => search.address !== address,
        ),
      },
    })),
  setSmartAccounts: (smartAccounts: SmartAccountInfo[]) => {
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        smartAccounts,
      },
    }));
  },
}));
