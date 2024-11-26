import { ProductInputAction } from "@/types/product";
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  PropsWithChildren,
  ReactNode,
} from "react";

interface DescriptionProps {
  name: string;
  value: string;
  placeholder: string;
  children: ReactNode;
  dispatch: Dispatch<ProductInputAction>;
}

function Description({
  children,
  name,
  value,
  placeholder,
  dispatch,
}: PropsWithChildren<DescriptionProps>) {
  const setDescription = (value: string) =>
    dispatch({ type: "SET_DESCRIPTION", payload: value });

  const handleInput = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(target.value);

  const handleBlur = ({ target }: FocusEvent<HTMLTextAreaElement>) =>
    setDescription(target.value.trim());
  return (
    <div className='form-input-wrap'>
      <label htmlFor={`item_${name}`}>{children}</label>
      <textarea
        id={`item_${name}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        required
      />
    </div>
  );
}

export default Description;
