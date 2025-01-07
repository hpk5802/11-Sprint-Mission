import Image from "next/image";
import { useState } from "react";
import EmptyIcon from "../Icons/EmptyIcon";

interface ImageProps {
  images: string[];
  name: string;
}

function ImageProduct({ images, name }: ImageProps) {
  const [imageRenderError, setImageRenderError] = useState(false);
  const image = images?.[0];

  return (
    <div className='img-wrap'>
      {imageRenderError || !image ? (
        <EmptyIcon />
      ) : (
        <Image
          fill
          src={image}
          alt={name || "product image"}
          onError={() => setImageRenderError(true)}
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
}

export default ImageProduct;
