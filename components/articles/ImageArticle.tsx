import Image from "next/image";
import { useState } from "react";

interface ImageProps {
  image: string;
  name: string;
}

function ImageArticle({ image, name }: ImageProps) {
  const [imageRenderError, setImageRenderError] = useState(false);
  const imgPath = image || "/icons/ic_no_image.svg"; // 등록된 이미지가 없는 경우 대체 이미지(ic_no_image) 노출

  return (
    <div className='img-wrap'>
      <Image
        fill
        src={imageRenderError ? "/icons/ic_no_image.svg" : imgPath}
        alt={name || "Article image"}
        onError={() => setImageRenderError(true)}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default ImageArticle;
