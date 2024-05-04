import { create } from "zustand";

const useArticleStore = create((set, get) => ({
  isLoadingArticle: false,
  setIsLoadingArticle: (newState) => set({ isLoadingArticle: newState }),
  articleData: null,
  setArticleData: (newArticle) => set({ articleData: newArticle }),
  articleId: "",
  setArticleId: (newId) => set({ articleId: newId }),
}));

export default useArticleStore;
