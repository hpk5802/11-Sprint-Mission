import { ProductInputAction } from "@/types/product";
import { formatPrice, formatToPrice } from "@/utils/formatPrice";
import { ChangeEvent, Dispatch, PropsWithChildren, ReactNode } from "react";

interface PriceInputProps {
  name: string;
  value: number;
  children: ReactNode;
  dispatch: Dispatch<ProductInputAction>;
}

function PriceInput({
  children,
  name,
  value,
  dispatch,
}: PropsWithChildren<PriceInputProps>) {
  /**
   * String 타입의 입력을 금액 형식으로 formating해 input에 출력
   */
  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const priceValue = formatToPrice(target.value);
    const regExp = /^\d*$/; // 숫자만 입력 가능하게 하기 위한 정규식
    if (regExp.test(priceValue)) {
      dispatch({ type: "SET_PRICE", payload: +priceValue });
    }
  };
  return (
    <div className='form-input-wrap'>
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type='text'
        placeholder='상품 가격을 입력해주세요'
        value={formatPrice(value)}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default PriceInput;
