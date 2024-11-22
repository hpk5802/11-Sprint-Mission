import ArticleList from "@/components/articles/ArticleList";
import BestArticleList from "@/components/articles/BestArticleList";
import Header from "@/components/common/Header";

function index() {
  return (
    <>
      <Header isLogin={true} />
      <main className='page-boards'>
        <BestArticleList />
        <ArticleList />
      </main>
    </>
  );
}

export default index;
