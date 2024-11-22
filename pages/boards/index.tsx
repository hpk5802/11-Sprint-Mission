import BestArticleList from "@/components/articles/BestArticleList";
import Header from "@/components/common/Header";

function index() {
  return (
    <>
      <Header isLogin={true} />
      <main className='page-boards'>
        <BestArticleList />
      </main>
    </>
  );
}

export default index;
