import { create } from "zustand";

export type PinnedApps = {
  pinnedApps: string[];
  addPinnedApps: (id: string) => void;
  removePinnedApps: (id: string) => void;
};

export const usePinnedApps = create<PinnedApps>()((set) => ({
  pinnedApps: [],
  addPinnedApps: (id: string) =>
    set((state) => ({ pinnedApps: [...state.pinnedApps, id] })),
  removePinnedApps: (id: string) =>
    set((state) => ({
      pinnedApps: state.pinnedApps.filter((value) => value !== id),
    })),
}));
