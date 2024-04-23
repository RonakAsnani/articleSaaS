import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  isLoading: false,
  setIsLoading: (newState) => set({ isLoading: newState }),
}));

export default useGlobalStore;
