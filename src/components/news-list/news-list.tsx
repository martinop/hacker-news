import { NewArticle } from "../../types";
import Card from "../card";
import "./news-list.styles.css";

type NewsListType = {
  news: NewArticle[];
};

function NewsList(props: NewsListType) {
  const { news } = props;
  return (
    <div className="news-list">
      {news.map((n) => (
        <Card
          key={`new-${n.id}`}
          {...n}
          isFavorite={false}
          onClick={console.log}
        />
      ))}
    </div>
  );
}

export default NewsList;
