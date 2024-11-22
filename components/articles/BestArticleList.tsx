import { fetchArticles } from "@/pages/api/articleApi";
import { ArticleInterface } from "@/types/article";
import { useEffect, useState } from "react";
import BestArticle from "./BestArticle";

function BestArticleList() {
  const [articles, setArticles] = useState<ArticleInterface[]>([]);

  useEffect(() => {
    fetchArticles({ page: "8", pageSize: "3" }).then(({ list }) =>
      setArticles(list)
    );
  }, []);

  return (
    <section id='section_best'>
      <h2 className='article-title'>베스트 상품</h2>
      <ul className='article-wrap best'>
        {articles.map((article) => (
          <li key={article.id}>
            <BestArticle isBest article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestArticleList;
