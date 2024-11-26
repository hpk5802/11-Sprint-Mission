import Image from "next/image";
import { ChangeEvent } from "react";

interface SearchProps {
  setKeyword: (value: string) => void;
}

function Search({ setKeyword }: SearchProps) {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setKeyword(target.value);
  return (
    <div className='input-area'>
      <div>
        <Image
          fill
          src='/icons/ic_search.svg'
          alt='검색할 상품을 입력해주세요'
        />
      </div>
      <input
        type='text'
        placeholder='검색할 상품을 입력해주세요'
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
