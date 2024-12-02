import { FormInputInterface } from "@/types/addBoard";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

interface ImgFileInputProps {
  name: keyof FormInputInterface;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
  children: ReactNode;
}

function ImgFileInput({
  name,
  register,
  watch,
  setValue,
  children,
}: ImgFileInputProps) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [showWarn, setShowWarn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const img = watch(name);

  /**
   * 이미지 파일 추가 - 1개 이상인 경우 클릭 시 경고 노출
   */
  const handleClick = () => {
    if (!imagePath && inputRef.current) inputRef.current.click();
    else setShowWarn(true);
  };

  /**
   * 이미지 삭제
   */
  const handleDelete = () => {
    setImagePath(null);
    setValue(name, null);
    setShowWarn(false);
  };

  useEffect(() => {
    if (img && img[0]) {
      const file = img[0];
      setImagePath(URL.createObjectURL(file));
    } else {
      setImagePath(null);
    }
  }, [img]);
  return (
    <div className='form-input-wrap'>
      <label>{children}</label>
      <input
        type='file'
        className='sr-only'
        accept='image/*'
        {...register(name)}
        ref={(el) => {
          inputRef.current = el;
          register(name).ref(el);
        }}
      />
      {/* className='sr-only' */}
      <div className='upload-area'>
        <button
          className='btn-upload-img'
          type='button'
          title='이미지 등록'
          onClick={handleClick}
        >
          <span>
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10 24H38'
                stroke='#9CA3AF'
                strokeWidth='4'
                strokeLinecap='round'
              />
              <path
                d='M24 38V10'
                stroke='#9CA3AF'
                strokeWidth='4'
                strokeLinecap='round'
              />
            </svg>
          </span>
          이미지 등록
        </button>
        {imagePath && (
          <div className='thumbnail'>
            <Image fill src={imagePath} alt='thumbnail' />
            <button
              type='button'
              className='btn-delete-thumbnail'
              onClick={handleDelete}
            >
              <span className='sr-only'>삭제</span>
            </button>
          </div>
        )}
      </div>
      {showWarn && (
        <div className='error-msg'>*이미지 등록은 최대 1개까지 가능합니다.</div>
      )}
    </div>
  );
}

export default ImgFileInput;
