import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageProps {
  images: string[];
  name: string;
}

function ImageComponent({ images, name }: ImageProps) {
  const [imageRenderError, setImageRenderError] = useState(false);
  const image = images?.[0] || "/icons/ic_no_image.svg"; // 등록된 이미지가 없는 경우 대체 이미지(ic_no_image) 노출

  return (
    <div className='img-wrap'>
      <Image
        fill
        src={imageRenderError ? "/icons/ic_no_image.svg" : image}
        alt={name || "product image"}
        onError={() => setImageRenderError(true)}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default ImageComponent;
