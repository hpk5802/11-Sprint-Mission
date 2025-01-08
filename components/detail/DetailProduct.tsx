import { formatPriceToKRW } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import ImageProduct from "../items/ImageProduct";
import ProfileIcon from "../Icons/ProfileIcon";
import HeartIcon from "../Icons/HeartIcon";
import DropDownInquiry from "./DropDownInquiry";
import { useState } from "react";
import { useRouter } from "next/router";

interface DetailProductProps {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  favoriteCount: number;
  tags: string[];
  ownerId: number;
  ownerNickname: string;
  updatedAt: string;
  isFavorite?: boolean;
  onDelete: (id: string) => void;
}

function DetailProduct({
  id,
  name,
  description,
  images,
  price,
  favoriteCount,
  tags,
  ownerId,
  ownerNickname,
  updatedAt,
  isFavorite,
  onDelete,
}: DetailProductProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false); // 수정 상태를 할당할 state
  const userId = localStorage.getItem("userId");

  return (
    <div className='product-detail-contents'>
      {!isEditing && String(ownerId) === userId && (
        <DropDownInquiry
          setIsEditting={setIsEditing}
          onDelete={() => {
            onDelete(String(id));
            router.push("/items");
          }}
        />
      )}
      <ImageProduct images={images} name={name} />
      <div className='desc-wrap'>
        <h2 className='detail-name'>{name}</h2>
        <div className='detail-price'>{formatPriceToKRW(price)}</div>
        <div className='detail-description-wrap'>
          <div className='detail-description-title'>상품 소개</div>
          <p className='detail-description'>{description}</p>
        </div>
        <div className='detail-tag-wrap'>
          <div className='detail-tag-title'>상품 태그</div>
          <div className='detail-tags'>
            {tags.map((tag) => (
              <span key={tag} className='detail-tag'>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className='detail-footer'>
          <div className='owner-wrap'>
            <div className='owner-icon'>
              <ProfileIcon />
            </div>
            <div className='owner-desc'>
              <div className='owner-name'>{ownerNickname}</div>
              <div className='date-update'>{formatDate(updatedAt)}</div>
            </div>
          </div>
          <button className='btn-favorite'>
            <div>
              <HeartIcon isFavorite={isFavorite} />
            </div>
            <span>{favoriteCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
