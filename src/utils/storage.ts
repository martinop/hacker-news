import { FAVORITES_STORAGE_KEY, FILTER_STORAGE_KEY } from "../constants";
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

export function getFilter(): string {
  const filter = localStorage.getItem(FILTER_STORAGE_KEY);
  return filter || "";
}

export function storeFilter(value: string) {
  localStorage.setItem(FILTER_STORAGE_KEY, value);
}
