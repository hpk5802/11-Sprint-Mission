import Link from "next/link";
import { formatPriceToKRW } from "@/utils/formatPrice";
import { ProductInterface } from "@/types/product";
import ImageProduct from "./ImageProduct";
import HeartIcon from "../Icons/HeartIcon";

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
              <HeartIcon />
            </div>
            <span>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
