import { create } from "zustand";

export type SpinnerState = {
  isSpinnerActive: boolean;
  toogleSpinner: () => void;
  setSpinner: (isActive: boolean) => void;
};

export const useSpinnerStore = create<SpinnerState>()((set) => ({
  isSpinnerActive: false,
  toogleSpinner: () =>
    set((state) => ({ isSpinnerActive: !state.isSpinnerActive })),
  setSpinner: (isActive: boolean) => set({ isSpinnerActive: isActive }),
}));
