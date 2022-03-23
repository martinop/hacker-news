import React from "react";
import { NewArticle } from "../types";
import { getFavorites, storeFavorites } from "../utils/storage";

type ContextState = {
  favorites: NewArticle[];
  addFavorite: (newArticle: NewArticle) => void;
  removeFavorite: (articleId: NewArticle["id"]) => void;
};

type Props = {
  children: React.ReactNode;
};

const FavoritesContext = React.createContext<ContextState>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export function FavoritesContextProvider(props: Props) {
  const { children } = props;

  const [favorites, setFavorites] = React.useState<NewArticle[]>(
    getFavorites()
  );

  function addFavorite(newArticle: NewArticle) {
    const canAdd = !favorites.some((item) => item.id === newArticle.id);
    if (!canAdd) return;

    const newFavorites = [...favorites, newArticle];
    storeFavorites(newFavorites);
    setFavorites(newFavorites);
  }

  function removeFavorite(articleId: NewArticle["id"]) {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (item) => item.id !== articleId
      );
      storeFavorites(newFavorites);
      return newFavorites;
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavoritesContext = () => {
  const context = React.useContext(FavoritesContext);
  return context;
};
