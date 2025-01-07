import { ArticleInterface } from "@/types/article";
import { formatDate } from "@/utils/formatDate";
import ImageArticle from "./ImageArticle";
import Link from "next/link";
import clsx from "clsx";
import MedalIcon from "../Icons/MedalIcon";
import HeartIcon from "../Icons/HeartIcon";
import ProfileIcon from "../Icons/ProfileIcon";

interface ArticleProps {
  isBest?: boolean;
  article: ArticleInterface;
}

function Article({ isBest = false, article }: ArticleProps) {
  const { id, title, image, likeCount, writer, updatedAt } = article;
  return (
    <Link href={`/boards/${id}`} title={`${title} 상세보기`}>
      <div className={clsx("article", isBest && "best")}>
        {isBest && (
          <div className='medal-wrap'>
            <span>
              <MedalIcon width='16' height='16' />
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
                  <HeartIcon width='16' height='16' />
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
                <ProfileIcon width='24' height='24' />
              </div>
              <div className='nickname'>{writer.nickname}</div>
              <div className='date'>{formatDate(updatedAt)}</div>
            </div>
            <div className='like-count'>
              <span>
                <HeartIcon width='24' height='24' />
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
