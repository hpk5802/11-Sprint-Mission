import { ArticleInterface } from "@/types/article";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import ImageArticle from "./ImageArticle";
import Link from "next/link";

function Article({
  isBest = false,
  article,
}: {
  isBest?: boolean;
  article: ArticleInterface;
}) {
  const { id, title, image, likeCount, writer, updatedAt } = article;
  return (
    <Link href={`/boards/${id}`} title={`${title} 상세보기`}>
      <div className={["article", isBest ? "best" : ""].join(" ")}>
        {isBest && (
          <div className='medal-wrap'>
            <span>
              <Image fill src='/icons/ic_medal.svg' alt='best' />
            </span>
            Best
          </div>
        )}
        <div className='content-wrap'>
          <div className='title'>{title}</div>
          <ImageArticle image={image} name={title} />
        </div>
        {isBest ? (
          <div className='desc-wrap'>
            <div className='user-wrap'>
              <div className='nickname'>{writer.nickname}</div>
              <div className='like-count'>
                <span>
                  <Image fill src='/icons/ic_heart.svg' alt='하트' />
                </span>
                {likeCount}
              </div>
            </div>
            <div className='date'>{formatDate(updatedAt)}</div>
          </div>
        ) : (
          <div className='desc-wrap'>
            <div className='user-wrap'>
              <div className='user-profile'>
                <Image fill src='/icons/ic_user.svg' alt={writer.nickname} />
              </div>
              <div className='nickname'>{writer.nickname}</div>
              <div className='date'>{formatDate(updatedAt)}</div>
            </div>
            <div className='like-count'>
              <span>
                <Image fill src='/icons/ic_heart.svg' alt='하트' />
              </span>
              {likeCount}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Article;
