import { NewArticle } from "../../types";
import Card from "../card";
import "./news-list.styles.css";

type NewsListType = {
  news: NewArticle[];
  lastElementRef: any;
};

function NewsList(props: NewsListType) {
  const { news, lastElementRef } = props;
  return (
    <div className="news-list">
      {news.map((n, index) => {
        const isLast = index + 1 === news.length;
        return (
          <Card
            {...n}
            key={`new-${n.id}`}
            isFavorite={false}
            {...(isLast && { ref: lastElementRef })}
          />
        );
      })}
    </div>
  );
}

export default NewsList;
