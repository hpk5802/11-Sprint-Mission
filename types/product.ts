interface ProductInterface {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}
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

export { ProductInterface, ProductInputState, ProductInputAction };
