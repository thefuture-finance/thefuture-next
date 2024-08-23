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
};

export type GetAccountInfo = {
  accountInfo: {
    recentSearchs: SearchedAddress[];
    smartAccounts: SmartAccountInfo[];
    selectedAccount: SelectedAccountInfo;
    mainAccountAddress: String;
  };
  setSelectedAccount: (address: string, isSmart: boolean) => void;
  addRecentSearch: (newSearch: SearchedAddress) => void;
  setRecentSearch: (search: SearchedAddress[]) => void;
  removeRecentSearch: (address: string) => void;
};

export const useAccountInfo = create<GetAccountInfo>((set) => ({
  accountInfo: {
    recentSearchs: [],
    smartAccounts: [],
    selectedAccount: {
      address: "",
      isSmart: false,
    },
    mainAccountAddress: "",
  },
  setSelectedAccount: (address: string, isSmart: boolean) => {
    set((state) => ({
      ...state,
      accountInfo: {
        ...state.accountInfo,
        selectedAccount: { address, isSmart },
      },
    }));
  },
  addRecentSearch: (newSearch: SearchedAddress) => {
    set((state) => ({
      ...state,
      accountInfo: {
        ...state.accountInfo,
        recentSearchs: [...state.accountInfo.recentSearchs, newSearch],
      },
    }));
  },
  setRecentSearch: (searchs: SearchedAddress[]) =>
    set((state) => ({
      ...state,
      accountInfo: { ...state.accountInfo, recentSearchs: searchs },
    })),
  removeRecentSearch: (address: string) =>
    set((state) => ({
      ...state,
      accountInfo: {
        ...state.accountInfo,
        recentSearchs: state.accountInfo.recentSearchs.filter(
          (search) => search.address !== address,
        ),
      },
    })),
}));
