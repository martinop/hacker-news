import { useFavoritesContext } from "../../context/favorites";
import Card from "../card";

import "./favorites.styles.css";

function FavoritesList() {
  const { removeFavorite, favorites } = useFavoritesContext();

  return (
    <div>
      {favorites.length === 0 && <span>You don't have favorites yet</span>}
      <div className="favorites-list" data-testid="favorites-list">
        {favorites.map((n, index) => {
          return (
            <Card
              {...n}
              key={`favorite-${n.id}`}
              onToggleFavorite={() => removeFavorite(n.id)}
              isFavorite
            />
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesList;
