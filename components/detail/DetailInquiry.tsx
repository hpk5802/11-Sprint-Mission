import { useState } from "react";
import DropDownInquiry from "./DropDownInquiry";
import { updateComment, updateCommentInterface } from "@/pages/api/productApi";
import { calculateGapTime } from "@/utils/formatDate";
import Image from "next/image";

interface DetailInquiryProps {
  id: string;
  content: string;
  writer: any;
  updatedAt: string;
}

function DetailInquiry({ id, content, writer, updatedAt }: DetailInquiryProps) {
  const [isEditing, setIsEditing] = useState(false); // 수정 상태를 할당할 state
  const [comment, setComment] = useState(content); // 문의하기 text를 할당할 state

  /**
   * 취소 버튼 클릭 시 comment에 부모에서 받은 content를 할당
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setComment(content);
  };

  /**
   * save하면 서버에 request 보내고 response 받아서 commnets 업데이트
   */
  const handleSaveEdit = async () => {
    try {
      const updateData: updateCommentInterface = { content: comment };
      const response = await updateComment(id, updateData); // Jwt Token 추가 예정
      const data = await response.json(); // 서버에서 받은 response로 새 댓글 추가하는 기능은 추후 추가
      console.log(data); // netlify build error 방지 임시 콘솔 추가 - The build failure is due to a linting error
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='content-inquiry'>
      {!isEditing && <DropDownInquiry setIsEditting={setIsEditing} />}
      <div className='inquiry-comment'>
        {isEditing ? (
          <textarea
            name='inquiry_comment'
            id='inquiry_comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div className='inquiry-footer'>
        <div className='user-area'>
          <div className='writer-icon'>
            <svg
              viewBox='0 0 40 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_42798_1063)'>
                <circle cx='20' cy='20' r='20' fill='#D1D5DB' />
                <path
                  d='M19.374 8.72955C19.8844 10.4933 18.5349 12.4367 16.9881 12.8874C15.4413 13.338 13.328 12.4034 12.8176 10.6396C12.3072 8.87592 13.3786 6.43217 14.9255 5.98153C16.9881 5.38063 18.8637 6.96583 19.374 8.72955Z'
                  fill='white'
                />
                <path
                  d='M20.2247 8.72955C19.7143 10.4933 21.0638 12.4367 22.6106 12.8874C24.1575 13.338 26.2707 12.4034 26.7811 10.6396C27.2915 8.87592 26.2201 6.43217 24.6732 5.98153C22.6106 5.38063 20.7351 6.96583 20.2247 8.72955Z'
                  fill='white'
                />
                <path
                  d='M29.8016 21.6147C29.8016 26.1007 25.4028 27.7683 19.4026 27.7683C13.4025 27.7683 9.10324 26.1007 9.10324 21.6147C9.10324 16.3964 13.4025 11.7689 19.4026 11.7689C25.4028 11.7689 29.8016 16.0026 29.8016 21.6147Z'
                  fill='white'
                />
                <path
                  d='M17.4167 20.7285C17.4167 22.1978 16.4736 23.8096 15.1558 23.8096C13.8379 23.8096 11.709 22.6124 11.709 20.4177C11.709 18.3559 14.0088 17.6227 16.3853 17.9992C17.8419 18.2299 17.4167 19.2593 17.4167 20.7285Z'
                  fill='#D1D5DB'
                />
                <path
                  d='M16.3158 20.5796C16.3158 20.8 16.2495 20.9786 15.9181 20.9786C15.5867 20.9786 15.5204 20.8 15.5204 20.5796C15.5204 20.3592 15.653 20.1805 15.9181 20.1805C16.1832 20.1805 16.3158 20.3592 16.3158 20.5796Z'
                  fill='white'
                />
                <path
                  d='M21.4258 20.7284C21.4258 22.1976 22.3688 23.8094 23.6867 23.8094C25.0045 23.8094 27.1334 22.6123 27.1334 20.4175C27.1334 18.3558 24.8336 17.6226 22.4571 17.9991C21.0006 18.2298 21.4258 19.2592 21.4258 20.7284Z'
                  fill='#D1D5DB'
                />
                <path
                  d='M22.5283 20.5796C22.5283 20.8 22.5946 20.9786 22.926 20.9786C23.2574 20.9786 23.3237 20.8 23.3237 20.5796C23.3237 20.3592 23.1912 20.1805 22.926 20.1805C22.6609 20.1805 22.5283 20.3592 22.5283 20.5796Z'
                  fill='white'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M19.7575 30.0001C27.7508 30.0001 33.6107 27.7473 33.6107 21.6867C33.6107 14.1048 27.7508 8.38513 19.7575 8.38513C11.7642 8.38513 6.03683 14.6369 6.03683 21.6867C6.03683 27.7473 11.7642 30.0001 19.7575 30.0001ZM19.4429 27.6725C25.3226 27.6725 29.633 26.0228 29.633 21.5845C29.633 16.0322 25.3226 11.8437 19.4429 11.8437C13.5632 11.8437 9.35031 16.4219 9.35031 21.5845C9.35031 26.0228 13.5632 27.6725 19.4429 27.6725Z'
                  fill='white'
                />
                <g mask='url(#mask0_42798_1063)'>
                  <ellipse
                    cx='19.5833'
                    cy='37.5'
                    rx='11.25'
                    ry='12.5'
                    fill='white'
                  />
                </g>
              </g>
              <defs>
                <clipPath id='clip0_42798_1063'>
                  <rect width='40' height='40' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <div className='writer-name'>{writer.nickname}</div>
            <div className='date-update'>{calculateGapTime(updatedAt)}</div>
          </div>
        </div>
        {isEditing && (
          <div className='edit-area'>
            <button className='btn-cancel' onClick={handleCancelEdit}>
              취소
            </button>
            <button className='btn-edit' onClick={handleSaveEdit}>
              수정 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailInquiry;
