import React, { ForwardedRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { NewArticle } from "../../types";
import { EmptyHeart, FilledHeart } from "./icons";

import "./card.styles.css";

dayjs.extend(relativeTime);

type CardProps = NewArticle & {
  isFavorite: boolean;
  onToggleFavorite: (isFavorite: boolean) => void;
};

const Card = React.forwardRef(
  (props: CardProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { title, author, onToggleFavorite, storyUrl, createdAt, isFavorite } =
      props;

    function onPressFavorite(e: any) {
      e.stopPropagation();
      onToggleFavorite(isFavorite);
    }

    return (
      <a
        className="card"
        href={storyUrl}
        target="_blank"
        rel="noreferrer"
        {...(ref !== null && { ref })}
      >
        <div className="card-content">
          <div className="card-timeago">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="var(--color-gray-500)"
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"
              />
            </svg>
            <span>
              {dayjs(createdAt).fromNow()} by {author}
            </span>
          </div>
          <p className="card-title">{title}</p>
        </div>
        <button
          data-testid="favorite-section"
          className="card-favorite"
          onClick={onPressFavorite}
        >
          {isFavorite ? <FilledHeart /> : <EmptyHeart />}
        </button>
      </a>
    );
  }
);

export default React.memo(Card);
