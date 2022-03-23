import { FAVORITES_STORAGE_KEY } from "../constants";
import { NewArticle } from "../types";

export function storeFavorites(news: NewArticle[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(news));
}

export function getFavorites(): NewArticle[] {
  const entries = localStorage.getItem(FAVORITES_STORAGE_KEY);
  try {
    return entries ? JSON.parse(entries) : [];
  } catch (e) {
    return [];
  }
}
