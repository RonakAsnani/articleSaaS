import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));

export default useGlobalStore;
