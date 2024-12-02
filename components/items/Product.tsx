import Link from "next/link";
import { formatPriceToKRW } from "@/utils/formatPrice";
import Image from "next/image";
import { ProductInterface } from "@/types/product";
import ImageProduct from "./ImageProduct";

function Product({ product }: { product: ProductInterface }) {
  const { id, name, price, favoriteCount, images } = product;
  const formattedPrice = formatPriceToKRW(price);

  return (
    <Link href={`/items/${id}`} title={`${name} 상세보기`}>
      <div className='product'>
        <ImageProduct images={images} name={name} />
        <div className='desc-wrap'>
          <h3 className='product-name'>{name}</h3>
          <div className='product-price'>{formattedPrice}</div>
          <div className='product-favorite'>
            <div>
              <svg
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.5573 9.31157C3.40759 9.18016 3.28782 9.07475 3.20004 8.99739V8.95147L3.0243 8.77574C2.3305 8.08193 1.93337 7.16547 1.93337 6.2V6.07612C1.99484 4.2062 3.59191 2.66667 5.46671 2.66667C5.74499 2.66667 6.1142 2.76344 6.48225 2.96162C6.82958 3.14864 7.13445 3.40383 7.33689 3.68842C7.63138 4.31494 8.53917 4.30366 8.81157 3.65457C8.97931 3.36092 9.2733 3.0955 9.62562 2.89902C9.99324 2.694 10.3597 2.6 10.6 2.6C12.5294 2.6 14.0717 4.12742 14.1334 6.07581V6.2C14.1334 7.24201 13.73 8.14473 13.0613 8.75771L12.8667 8.93606V8.97957C12.7656 9.06525 12.6353 9.17766 12.4834 9.30974C12.1463 9.6029 11.6949 9.99999 11.2033 10.4332C11.0456 10.5722 10.8838 10.7149 10.7202 10.8592C9.86394 11.6143 8.9594 12.4119 8.34603 12.9417C8.16951 13.0861 7.89724 13.0861 7.72071 12.9417C6.9885 12.3093 5.82589 11.2962 4.83654 10.4316C4.34091 9.9984 3.88917 9.60286 3.5573 9.31157Z'
                  stroke='#4B5563'
                  strokeWidth='1.2'
                />
              </svg>
            </div>
            <span>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
