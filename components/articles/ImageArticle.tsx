import Image from "next/image";
import { useState } from "react";
import EmptyIcon from "../Icons/EmptyIcon";

interface ImageProps {
  image: string;
  name: string;
}

function ImageArticle({ image, name }: ImageProps) {
  const [imageRenderError, setImageRenderError] = useState(false);
  const imgPath = image;

  return (
    <div className='img-wrap'>
      {imageRenderError || !image ? (
        <EmptyIcon />
      ) : (
        <Image
          fill
          src={imgPath}
          alt={name || "Article image"}
          onError={() => setImageRenderError(true)}
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
}

export default ImageArticle;
