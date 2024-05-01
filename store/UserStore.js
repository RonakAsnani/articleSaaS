import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  isLoading: false,
  setIsLoading: (newState) => set({ isLoading: newState }),
}));

export default useUserStore;
