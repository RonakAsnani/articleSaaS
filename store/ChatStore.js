import { create } from "zustand";

const useChatStore = create((set, get) => ({
  isLoadingChats: false,
  setIsLoadingChats: (newState) => set({ isLoadingChats: newState }),
  chatData: [
    {
      text: "heehehe",
      chats: [
        { owner: "user", text: "eruivhieur" },
        { owner: "system", text: "ngfyuierg" },
      ],
    },
  ],
  isFetchingResponse: false,
  setIsFetchingResponse: (newState) => set({ isFetchingResponse: newState }),
  setChatData: (newChat) => set({ chatData: newChat }),
  chatStatus: "NONE",
  setChatStatus: (newStatus) => set({ chatStatus: newStatus }),
  chatIndex: -1,
  setChatIndex: (newStatus) => set({ chatIndex: newStatus }),
}));

export default useChatStore;
