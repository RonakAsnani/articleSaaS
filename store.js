import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  isLoading: false,
  setIsLoading: (newState) => set({ isLoading: newState }),
  articleData: null,
  setArticleData: (newArticle) => set({ articleData: newArticle }),
}));

export default useGlobalStore;
