import Image from "next/image";

function InquiryEmpty() {
  return (
    <div className='inquiry-empty'>
      <div>
        <Image
          fill
          src='/icons/ic_inquiry_empty.svg'
          alt='아직 문의가 없어요'
        />
      </div>
      <span>아직 문의가 없어요</span>
    </div>
  );
}

export default InquiryEmpty;
