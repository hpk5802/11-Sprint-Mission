import { ArticleInterface } from "@/types/article";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

function BestArticle({
  isBest,
  article,
}: {
  isBest?: boolean;
  article: ArticleInterface;
}) {
  const { title, image, likeCount, writer, updatedAt } = article;
  return (
    <div className='best-article'>
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
        <div className='img-wrap'>
          <Image fill src={image} alt={title} />
        </div>
      </div>
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
    </div>
  );
}

export default BestArticle;
