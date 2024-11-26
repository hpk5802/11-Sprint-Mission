interface ArticleInterface {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

interface ArticleInquiryInterface {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}
interface ArticleCommentInterface {
  list: ArticleInquiryInterface[];
  nextCursor: string | null;
}

interface PostCommentInterface {
  id: number;
  content: string;
}

export type {
  ArticleInterface,
  ArticleInquiryInterface,
  ArticleCommentInterface,
  PostCommentInterface,
};
