import InquiryEmptyIcon from "../Icons/InquiryEmptyIcon";

interface InquiryEmptyProps {
  isArticle?: boolean;
}

function InquiryEmpty({ isArticle = false }: InquiryEmptyProps) {
  return (
    <div className='inquiry-empty'>
      {isArticle ? (
        <>
          <div>
            <InquiryEmptyIcon isComment />
          </div>
          <span>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </span>
        </>
      ) : (
        <>
          <div>
            <InquiryEmptyIcon />
          </div>
          <span>아직 문의가 없어요</span>
        </>
      )}
    </div>
  );
}

export default InquiryEmpty;
