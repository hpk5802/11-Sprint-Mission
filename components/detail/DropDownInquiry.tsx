import { useState } from "react";
import ToggleIcon from "../Icons/ToggleIcon";

interface DropDownInquiryProps {
  setIsEditting: (value: boolean) => void;
  onDelete: () => void;
}

function DropDownInquiry({ setIsEditting, onDelete }: DropDownInquiryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(false);
    setIsEditting(true);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };
  return (
    <div className='menu'>
      <button
        type='button'
        className='btn-open-menu'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ToggleIcon />
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
