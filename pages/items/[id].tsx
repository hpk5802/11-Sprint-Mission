import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import {
  fetchInquiryById,
  fetchProductById,
  postComment,
} from "@/pages/api/api";
import DetailProduct from "@/components/detail/DetailProduct";
import PrimaryButton from "@/components/common/PrimaryButton";
import DetailInquiry from "@/components/detail/DetailInquiry";
import InquiryEmpty from "@/components/detail/InquiryEmpty";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface InputState {
  name: string;
  description: string;
  images: string[];
  price: number;
  favoriteCount: number;
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
}

interface InquiryInterface {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface CommentInterface {
  list: InquiryInterface[];
  nextCursor: string | null;
}

const INITIAL_DETAILS: InputState = {
  name: "",
  description: "",
  images: [],
  price: 0,
  favoriteCount: 0,
  tags: [],
  ownerNickname: "",
  updatedAt: "",
};

const INITIAL_COMMENTS: CommentInterface = { list: [], nextCursor: null };

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const productId = Array.isArray(id) ? id[0] : id;
  const [newComment, setNewComment] = useState("");
  const [product, setProduct] = useState(INITIAL_DETAILS); // 상품 정보 할당할 state
  const [comments, setComments] = useState<CommentInterface>(INITIAL_COMMENTS); // 상품 댓글 정보 할당할 state
  const { list, nextCursor } = comments;
  const endRef = useRef(null); // infinity scroll 구현을 위한 endPoint를 할당할 Ref

  /**
   * 서버에서 상품 상세 정보를 가져오는 함수
   * @param {*} id 상품 id
   */
  const loadProductById = useCallback((id: string) => {
    fetchProductById(id).then((response) => {
      setProduct(response);
    });
  }, []);

  /**
   * 서버에서 상품 댓글을 가져오는 함수
   * @param {*} id 상품 id
   * @param {*} nextCursor infinity scroll을 위한 변수
   */
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
    (e: FormEvent) => {
      e.preventDefault();
      if (!productId) {
        throw new Error("Id is null");
      }
      postComment(productId, { content: newComment }); // Jwt Token 추가 예정
      setNewComment("");
    },
    [productId, newComment]
  );

  /**
   * IntersectionObserver API를 사용한 inifinity scroll
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries; // 감시 대상 : endRef
      if (entry.isIntersecting && nextCursor && productId) {
        // 대상이 viewport에 들어왔을 때, nextCursor가 null이 아닌경우 다음 댓글 요청
        loadInquiryById(productId, nextCursor);
      }
    },
    [id, nextCursor, loadInquiryById]
  );

  useEffect(() => {
    if (!productId) return;
    loadProductById(productId);
    loadInquiryById(productId);
  }, [productId, loadProductById, loadInquiryById]);

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
        <DetailProduct {...product} />
        <div className='product-inquiry-wrap'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='input_inquiry'>문의하기</label>
            <textarea
              id='input_inquiry'
              value={newComment}
              placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
              onChange={({ target }) => setNewComment(target.value)}
            />
            <PrimaryButton type='submit' name='btn-add' disabled={!newComment}>
              등록
            </PrimaryButton>
          </form>
          {list.length > 0 ? (
            list.map(({ id, content, writer, updatedAt }) => (
              <DetailInquiry
                key={`comment_${id}`}
                id={id.toString()}
                content={content}
                writer={writer}
                updatedAt={updatedAt}
              />
            ))
          ) : (
            <InquiryEmpty />
          )}
        </div>
        {nextCursor && <div className='end-point' ref={endRef} />}
        <Link href='/items' className='navigate-to-items'>
          목록으로 돌아가기
          <span>
            <Image fill src='/icons/ic_back.svg' alt='목록으로 돌아가기' />
          </span>
        </Link>
      </div>
    </>
  );
}

export default Detail;
