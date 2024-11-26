import { useCallback, useEffect, useRef, useState } from "react";
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
  const { page } = useWindowSize();
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [productsPerPage, setProductsPerPage] = useState<number | null>(null); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [order, setOrder] = useState("recent"); // 데이터 정렬을 위한 queryParam [orderBy]
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isInitial, setIsInitial] = useState(true); // Observer API와 Initial Load의 충돌 방지를 위한 state
  const [hasMoreData, setHasMoreData] = useState(true);
  const endRef = useRef(null);

  const loadArticles = useCallback(
    (page = currentPage.toString(), pageSize = productsPerPage?.toString()) => {
      if (productsPerPage === null) return;
      fetchArticles({
        page: page,
        pageSize: pageSize,
        orderBy: order,
        keyword: keyword,
      }).then(({ list, totalCount }) => {
        // 서버의 더 요청할 데이터가 없으면 스크롤 막기 위해 분기처리
        const pageLimit = Math.ceil(totalCount / productsPerPage);
        if (pageLimit <= +page) setHasMoreData(false);
        setArticles((prev) => (page === "1" ? list : [...prev, ...list]));
        setIsInitial(false);
      });
    },
    [currentPage, keyword, order, productsPerPage]
  );

  /**
   * IntersectionObserver API를 사용한 inifinity scroll
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries; // 감시 대상 : endRef
      // 초기 로딩 x & 서버에 더 요청할 수 있는 데이터가 있으면 page 증가시킴
      if (entry.isIntersecting && !isInitial && hasMoreData)
        setCurrentPage((prev) => prev + 1);
    },
    [isInitial, hasMoreData]
  );

  useEffect(() => {
    // initail 데이터 로드
    loadArticles();
  }, [loadArticles]);

  // 디바이스 분기처리 - page를 1로 초기화해 서버의 page=1 부터 데이터 새로 로드
  useEffect(() => {
    setHasMoreData(true);
    setIsInitial(true);
    setCurrentPage(1);
    setProductsPerPage(page);
  }, [page]);

  useEffect(() => {
    setHasMoreData(true);
    setCurrentPage(1);
  }, [order, keyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // 감시 기준 : viewport
      threshold: 1.0, // 대상이 viewport에 완전히 노출될 때
    });
    const current = endRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleObserver]);

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
      {articles.length > 0 ? (
        <>
          <ul className='article-wrap'>
            {articles.map((article) => (
              <li key={article.id}>
                <Article article={article} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className='no-result'>검색 내용이 없습니다...</div>
      )}
      <div className='end-point' ref={endRef} />
    </section>
  );
}

export default ArticleList;
