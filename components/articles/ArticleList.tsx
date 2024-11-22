import { useCallback, useEffect, useState } from "react";
import Article from "./Article";
import { ArticleInterface } from "@/types/article";
import { fetchArticles } from "@/pages/api/articleApi";
import PrimaryButton from "../common/PrimaryButton";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import Search from "../items/Search";
import DropDown from "../items/DropDown";
import Paginations from "../items/Paginations";

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
  const [productsPerPage, setProductsPerPage] = useState<number | null>(null); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [order, setOrder] = useState("recent"); // 데이터 정렬을 위한 queryParam [orderBy]
  const [currentPage, setCurrentPage] = useState(1); // 데이터 호출을 위한 queryParam [page]
  const [keyword, setKeyword] = useState("");

  const loadArticles = useCallback(
    (page = currentPage.toString(), pageSize = productsPerPage?.toString()) => {
      if (productsPerPage === null) return;
      fetchArticles({
        page,
        pageSize: pageSize,
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

  /**
   * pagination 핸들러
   * @param {*} page active 페이지
   */
  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    // initail 데이터 로드
    loadArticles();
  }, [loadArticles]);

  useEffect(() => {
    setProductsPerPage(showPerPage);
  }, [showPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [order, keyword]);

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
      {articles.list.length > 0 ? (
        <>
          <ul className='article-wrap'>
            {articles.list.map((article) => (
              <li key={article.id}>
                <Article article={article} />
              </li>
            ))}
          </ul>
          <Paginations
            totalPage={articles.totalArticlesCount}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <div className='no-result'>검색 내용이 없습니다...</div>
      )}
    </section>
  );
}

export default ArticleList;
