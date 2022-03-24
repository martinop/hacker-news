import React from "react";
import { useFavoritesContext } from "../../context/favorites";
import { NewArticle } from "../../types";
import Card from "../card";
import "./news-list.styles.css";

type NewsListType = {
  news: NewArticle[];
  lastElementRef: (node: HTMLDivElement | null) => void;
};

function NewsList(props: NewsListType) {
  const { news, lastElementRef } = props;
  const { addFavorite, removeFavorite, favorites } = useFavoritesContext();

  const favoritesIds = React.useMemo(
    () => favorites.map((e) => e.id),
    [favorites]
  );

  return (
    <div className="news-list" data-testid="news-list">
      {news.map((n, index) => {
        const isLast = index + 1 === news.length;
        return (
          <Card
            {...n}
            key={`new-${n.id}`}
            onToggleFavorite={(shouldRemove) =>
              shouldRemove ? removeFavorite(n.id) : addFavorite(n)
            }
            isFavorite={favoritesIds.includes(n.id)}
            {...(isLast && { ref: lastElementRef })}
          />
        );
      })}
    </div>
  );
}

export default NewsList;
