import Header from "@/components/common/Header";
import BestProductList from "@/components/items/BestProductList";
import ProductList from "@/components/items/ProductList";

function Items() {
  return (
    <>
      <Header isLogin={true} />
      <main className='page-items'>
        <BestProductList />
        <ProductList />
      </main>
    </>
  );
}

export default Items;
