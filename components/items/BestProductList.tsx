import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import { fetchProducts } from "@/pages/api/productApi";
import { ProductInterface } from "@/types/product";
import useWindowSize from "@/hooks/useWindowSize";

function BestProductList() {
  const { pageBestProduct } = useWindowSize();
  const [bestProducts, setBestProducts] = useState<ProductInterface[]>([]); // 서버에서 받아올 BestProudcts를 할당할 state
  const [productCount, setProductCount] = useState<number | null>(null); // 반응형에 따라 보여줄 Product 수를 할당할 state

  const loadBestProducts = useCallback(
    (pageSize = productCount?.toString(), orderBy = "favorite") => {
      if (productCount === null) return;
      fetchProducts({
        pageSize: pageSize,
        orderBy,
      }).then(({ list }) => setBestProducts(list));
    },
    [productCount]
  );

  useEffect(() => {
    // initail 데이터 로드
    loadBestProducts();
  }, [loadBestProducts]);

  useEffect(() => {
    setProductCount(pageBestProduct);
  }, [pageBestProduct]);

  return (
    <section id='section_favorite'>
      <h2 className='products-title'>베스트 상품</h2>
      <ul className='products-wrap favorite'>
        {bestProducts.map((product) => (
          <li key={product.id} className='product-item '>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestProductList;
