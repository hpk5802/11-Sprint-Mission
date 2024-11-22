import { useState } from "react";

interface DropDownProps {
  order: sort[];
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}

type sort = {
  text: string;
  value: string;
};

function DropDown({ order, setOrder }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemText, setSelectedItemText] = useState("최신순");

  /**
   * DropDown 메뉴 클릭 핸들러
   */
  const onSelectItem = ({ text, value }: sort) => {
    setIsOpen(false);
    setSelectedItemText(text);
    setOrder(value);
  };

  return (
    <div className='sort-area'>
      <button
        type='button'
        className='btn-sort'
        onClick={() => setIsOpen((prev) => !prev)} // DropDown 토글
      >
        <span className='mo-hidden'>{selectedItemText}</span>
      </button>
      {isOpen && (
        <div className='options'>
          {order.map((option) => (
            <button
              key={option.value}
              type='button'
              onClick={() => onSelectItem(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
