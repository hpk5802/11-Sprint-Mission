import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import DropDown from "./DropDown";
import Search from "./Search";
import Paginations from "./Paginations";
import { fetchProducts } from "@/pages/api/productApi";
import PrimaryButton from "../common/PrimaryButton";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import { ProductInterface } from "@/types/product";

const sortOptions = [
  {
    text: "최신순",
    value: "recent",
  },
  {
    text: "좋아요순",
    value: "favorite",
  },
];

function ProductList() {
  const showPerPage = useWindowSize();
  const [products, setProducts] = useState<{
    list: ProductInterface[];
    totalProductsCount: number;
  }>({ list: [], totalProductsCount: 0 }); // 서버에서 받아올 Proudcts를 할당할 state
  const [productsPerPage, setProductsPerPage] = useState(showPerPage); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [order, setOrder] = useState("recent"); // 데이터 정렬을 위한 queryParam [orderBy]
  const [currentPage, setCurrentPage] = useState(1); // 데이터 호출을 위한 queryParam [page]
  const [keyword, setKeyword] = useState("");

  /**
   * 서버에서 데이터를 가져오는 함수
   * 재사용을 위해 useCallback Hook으로 함수 캐싱 -> React: exhustive-deps Eslint 방지
   */
  const loadProducts = useCallback(
    (page = currentPage.toString(), pageSize = productsPerPage.toString()) => {
      fetchProducts({ page, pageSize, orderBy: order, keyword: keyword }).then(
        ({ list, totalCount }) => {
          const totalPageCount = Math.ceil(totalCount / productsPerPage);
          setProducts({ list: list, totalProductsCount: totalPageCount });
          if (!keyword && currentPage > totalPageCount)
            setCurrentPage(totalPageCount);
        }
      );
    },
    [currentPage, productsPerPage, order, keyword]
  );

  /**
   * pagination 핸들러
   * @param {*} page active 페이지
   */
  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    // initial 데이터 로드
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setProductsPerPage(showPerPage);
  }, [showPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [order, keyword]);

  return (
    <section id='section_all'>
      <div className='top'>
        <h2 className='products-title'>전체 상품</h2>
        <div className='filter-area'>
          <Search setKeyword={setKeyword} />
          <PrimaryButton name='btn-register'>
            <Link href='/addItem'>상품 등록하기</Link>
          </PrimaryButton>
          <DropDown order={sortOptions} setOrder={setOrder} />
        </div>
      </div>
      {products.list.length > 0 ? (
        <>
          <ul className='products-wrap all'>
            {products.list.map((product) => (
              <li key={product.id} className='product-item'>
                <Product product={product} />
              </li>
            ))}
          </ul>
          <Paginations
            totalPage={products.totalProductsCount}
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

export default ProductList;
