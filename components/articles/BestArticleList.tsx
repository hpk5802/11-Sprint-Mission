import { fetchArticles } from "@/pages/api/articleApi";
import { ArticleInterface } from "@/types/article";
import { useCallback, useEffect, useState } from "react";
import Article from "./Article";
import useWindowSize from "@/hooks/useWindowSize";

function BestArticleList() {
  const showPerPage = useWindowSize().pageBestArticle;
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [articleCount, setArticleCount] = useState<number | null>(null); // 반응형에 따라 보여줄 Article 수를 할당할 state

  const loadBestArticles = useCallback(
    (pageSize = articleCount?.toString()) => {
      if (articleCount === null) return;
      fetchArticles({
        pageSize: pageSize,
      }).then(({ list }) => {
        setArticles(list);
      });
    },
    [articleCount]
  );

  useEffect(() => {
    // initail 데이터 로드
    loadBestArticles();
  }, [loadBestArticles]);

  useEffect(() => {
    setArticleCount(showPerPage);
  }, [showPerPage]);

  return (
    <section id='section_best'>
      <h2 className='article-title'>베스트 상품</h2>
      <ul className='article-wrap best'>
        {articles.map((article) => (
          <li key={article.id}>
            <Article isBest article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestArticleList;
