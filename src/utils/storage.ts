import { FAVORITES_STORAGE_KEY } from "../constants";
import { NewArticle } from "../types";

export function addFavorite(newArticle: NewArticle) {
  const favorites = getFavorites();
  const canAdd = !favorites.some((item) => item.id === newArticle.id);
  if (!canAdd) return;

  const newFavorites = [...favorites, newArticle];
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
}

export function getFavorites(): NewArticle[] {
  const entries = localStorage.getItem(FAVORITES_STORAGE_KEY);
  try {
    return entries ? JSON.parse(entries) : [];
  } catch (e) {
    return [];
  }
}

export function removeFavorite(articleId: NewArticle["id"]) {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((item) => item.id !== articleId);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
}
