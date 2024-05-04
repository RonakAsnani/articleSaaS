import { create } from "zustand";

const useChatStore = create((set, get) => ({
  isLoadingChats: false,
  setIsLoadingChats: (newState) => set({ isLoadingChats: newState }),
  chatData: [],
  isFetchingResponse: false,
  setIsFetchingResponse: (newState) => set({ isFetchingResponse: newState }),
  setChatData: (newChat) => set({ chatData: newChat }),
  chatStatus: "NONE",
  setChatStatus: (newStatus) => set({ chatStatus: newStatus }),
  chatIndex: 0,
  setChatIndex: (newStatus) => set({ chatIndex: newStatus }),
}));

export default useChatStore;
