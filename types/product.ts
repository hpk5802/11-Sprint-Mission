interface ProductInputState {
  images: string[];
  name: string;
  description: string;
  price: number;
  tags: string[];
}

type ProductInputAction =
  | { type: "SET_IMAGES"; payload: string[] }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_TAGS"; payload: string[] };

export { ProductInputState, ProductInputAction };
