import { ArticleInterface } from "@/types/article";
import { formatDate } from "@/utils/formatDate";
import ProfileIcon from "../Icons/ProfileIcon";
import HeartIcon from "../Icons/HeartIcon";

function DetailArticle({
  id,
  title,
  content,
  createdAt,
  updatedAt,
  likeCount,
  writer,
}: ArticleInterface) {
  return (
    <div className='article-detail-contents'>
      <div className='desc-wrap'>
        <h2 className='detail-title'>{title}</h2>
        <div className='detail-writer-wrap'>
          <div className='writer-img'>
            <span>
              <ProfileIcon />
            </span>
          </div>
          <div className='writer-name'>{writer.nickname}</div>
          <div className='update-date'>{formatDate(updatedAt)}</div>
          <div className='like-count'>
            <div className='icon-heart'>
              <HeartIcon />
            </div>
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
      <div className='detail-desc'>{content}</div>
    </div>
  );
}

export default DetailArticle;
