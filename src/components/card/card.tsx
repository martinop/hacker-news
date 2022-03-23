import React from "react";
import dayjs from "dayjs";

import { NewArticle } from "../../types";
import { EmptyHeart, FilledHeart } from "./icons";

import "./card.styles.css";

type CardProps = NewArticle & {
  isFavorite: boolean;
};

const Card = React.forwardRef((props: CardProps, ref: any) => {
  const { title, author, storyUrl, createdAt, isFavorite } = props;

  function onOpen() {
    window.open(storyUrl, "_blank");
  }

  return (
    <div className="card" onClick={onOpen} ref={ref}>
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
      <div className="card-favorite">
        {isFavorite ? <FilledHeart /> : <EmptyHeart />}
      </div>
    </div>
  );
});

export default Card;
