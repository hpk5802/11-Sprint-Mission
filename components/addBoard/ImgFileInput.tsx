import { FormInputInterface } from "@/types/addBoard";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import PlusIcon from "../Icons/PlusIcon";

interface ImgFileInputProps {
  name: keyof FormInputInterface;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
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
      <div className='upload-area'>
        <button
          className='btn-upload-img'
          type='button'
          title='이미지 등록'
          onClick={handleClick}
        >
          <span>
            <PlusIcon width='48' height='48' />
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
