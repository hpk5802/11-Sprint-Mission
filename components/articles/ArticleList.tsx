import { useCallback, useEffect, useState } from "react";
import Article from "./Article";
import { ArticleInterface } from "@/types/article";
import { fetchArticles } from "@/pages/api/articleApi";
import PrimaryButton from "../common/PrimaryButton";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import Search from "../items/Search";
import DropDown from "../items/DropDown";

const sortOptions = [
  {
    text: "최신순",
    value: "recent",
  },
  {
    text: "좋아요순",
    value: "like",
  },
];

function ArticleList() {
  const showPerPage = useWindowSize();
  const [articles, setArticles] = useState<{
    list: ArticleInterface[];
    totalArticlesCount: number;
  }>({ list: [], totalArticlesCount: 0 });
  const [productsPerPage, setProductsPerPage] = useState(showPerPage); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [order, setOrder] = useState("recent"); // 데이터 정렬을 위한 queryParam [orderBy]
  const [currentPage, setCurrentPage] = useState(1); // 데이터 호출을 위한 queryParam [page]
  const [keyword, setKeyword] = useState("");

  const loadArticles = useCallback(
    (page = currentPage.toString(), pageSize = productsPerPage.toString()) => {
      fetchArticles({
        page,
        pageSize: "10",
        orderBy: order,
        keyword: keyword,
      }).then(({ list, totalCount }) => {
        const totalPageCount = Math.ceil(totalCount / productsPerPage);
        setArticles({ list: list, totalArticlesCount: totalPageCount });
        if (!keyword && currentPage > totalPageCount)
          setCurrentPage(totalPageCount);
      });
    },
    [currentPage, keyword, order, productsPerPage]
  );

  useEffect(() => {
    // initail 데이터 로드
    loadArticles();
  }, [loadArticles]);

  return (
    <section id='section_all'>
      <h2 className='article-title'>게시글</h2>
      <PrimaryButton name='btn-register'>
        <Link href='/addArticle'>글쓰기</Link>
      </PrimaryButton>
      <div className='filter-area'>
        <Search setKeyword={setKeyword} />
        <DropDown order={sortOptions} setOrder={setOrder} />
      </div>
      <ul className='article-wrap'>
        {articles.list.map((article) => (
          <li key={article.id}>
            <Article article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ArticleList;
