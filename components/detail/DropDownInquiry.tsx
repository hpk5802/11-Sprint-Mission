import Image from "next/image";
import { useState } from "react";

interface DropDownInquiryProps {
  setIsEditting: (value: boolean) => void;
}

function DropDownInquiry({ setIsEditting }: DropDownInquiryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(false);
    setIsEditting(true);
  };

  const handleDelete = () => {
    setIsOpen(false);
  };
  return (
    <div className='menu'>
      <button
        type='button'
        className='btn-open-menu'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='12.5' cy='6.5' r='1.5' fill='#9CA3AF' />
          <circle cx='12.5' cy='11.5' r='1.5' fill='#9CA3AF' />
          <circle cx='12.5' cy='16.5' r='1.5' fill='#9CA3AF' />
        </svg>
      </button>
      {isOpen && (
        <div className='menus'>
          <button type='button' onClick={handleEdit}>
            수정하기
          </button>
          <button type='button' onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDownInquiry;
