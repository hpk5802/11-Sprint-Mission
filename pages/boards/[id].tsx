import Header from "@/components/common/Header";
import DetailArticle from "@/components/detail/DetailArticle";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  fetchArticleById,
  fetchInquiryById,
  postArticleComment,
} from "../api/articleApi";
import { ArticleCommentInterface, ArticleInterface } from "@/types/article";
import PrimaryButton from "@/components/common/PrimaryButton";
import DetailInquiry from "@/components/detail/DetailInquiry";
import InquiryEmpty from "@/components/detail/InquiryEmpty";

const INITIAL_DETAILS: ArticleInterface = {
  id: 0,
  title: "",
  content: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  likeCount: 0,
  writer: {
    id: 0,
    nickname: "",
  },
};

const INITIAL_COMMENTS: ArticleCommentInterface = {
  list: [],
  nextCursor: null,
};

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(INITIAL_DETAILS);
  const [comments, setComments] =
    useState<ArticleCommentInterface>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const { list, nextCursor } = comments;
  const endRef = useRef(null); // infinity scroll 구현을 위한 endPoint를 할당할 Ref

  const loadArticleById = useCallback((id: string) => {
    fetchArticleById(id).then((response) => setArticle(response));
  }, []);

  const loadInquiryById = useCallback(
    (id: string, nextCursor: string | null = null) => {
      fetchInquiryById(id, nextCursor).then(({ list, nextCursor }) => {
        setComments((prev) => ({
          list: [...prev.list, ...list],
          nextCursor,
        }));
      });
    },
    []
  );

  /**
   * 댓글 추가 핸들러
   * @param {*} e
   */
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!id) {
        throw new Error("Id is null");
      }
      const response = await postArticleComment({
        id: +id,
        content: newComment,
      });
      console.log(response);
      setComments((prev) => ({
        ...prev,
        list: [response, ...prev.list],
      }));
      setNewComment("");
    },
    [id, newComment]
  );

  /**
   * IntersectionObserver API를 사용한 inifinity scroll
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries; // 감시 대상 : endRef
      if (entry.isIntersecting && nextCursor && id) {
        // 대상이 viewport에 들어왔을 때, nextCursor가 null이 아닌경우 다음 댓글 요청
        loadInquiryById(id.toString(), nextCursor);
      }
    },
    [id, nextCursor, loadInquiryById]
  );

  useEffect(() => {
    if (!id) return;
    loadArticleById(id.toString());
    loadInquiryById(id.toString());
  }, [id, loadArticleById, loadInquiryById]);

  /**
   * Intersection Obsever API를 사용해 endRef(.end-point)의 영역을 비동기 감시
   */
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
    <>
      <Header isLogin />
      <div className='page-detail'>
        <DetailArticle {...article} />
        <div className='article-inquiry-wrap'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='input_inquiry'>댓글달기</label>
            <textarea
              id='input_inquiry'
              value={newComment}
              placeholder='댓글을 입력해주세요.'
              onChange={({ target }) => setNewComment(target.value)}
            />
            <PrimaryButton type='submit' name='btn-add' disabled={!newComment}>
              등록
            </PrimaryButton>
          </form>
          {list.length > 0 ? (
            list.map(({ id, content, writer, updatedAt }) => (
              <DetailInquiry
                key={id}
                id={id.toString()}
                content={content}
                writer={writer}
                updatedAt={updatedAt}
              />
            ))
          ) : (
            <InquiryEmpty isArticle={true} />
          )}
        </div>
        {nextCursor && <div className='end-point' ref={endRef} />}
        <Link href='/boards' className='navigate-to-items'>
          목록으로 돌아가기
          <span>
            {/* Sprint10에 추가 예정 */}
            <svg
              viewBox='0 0 25 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.53333 3.60012C6.03627 3.60012 5.63333 4.00307 5.63333 4.50012C5.63333 4.99718 6.03627 5.40012 6.53333 5.40012V3.60012ZM6.53333 5.40012H16.6667V3.60012H6.53333V5.40012ZM21.1 9.83345V10.9001H22.9V9.83345H21.1ZM16.6667 15.3335H6.53333V17.1335H16.6667V15.3335ZM21.1 10.9001C21.1 13.3486 19.1151 15.3335 16.6667 15.3335V17.1335C20.1092 17.1335 22.9 14.3427 22.9 10.9001H21.1ZM16.6667 5.40012C19.1151 5.40012 21.1 7.38499 21.1 9.83345H22.9C22.9 6.39088 20.1092 3.60012 16.6667 3.60012V5.40012Z'
                fill='white'
              />
              <path
                d='M3 16.2335L10.2 12.5384L10.2 19.9285L3 16.2335Z'
                fill='white'
              />
            </svg>
          </span>
        </Link>
      </div>
    </>
  );
}

export default Detail;
