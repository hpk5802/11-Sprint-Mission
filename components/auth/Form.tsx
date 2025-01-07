import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

type FormType = "login" | "signup";

interface FormInterface {
  formType: FormType;
  isValid: boolean;
  children: ReactNode;
  handleSubmit: () => void;
}

function Form({
  children,
  formType,
  isValid = false,
  handleSubmit,
}: PropsWithChildren<FormInterface>) {
  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type='submit' className='btn login' disabled={!isValid}>
        로그인
      </button>
      <div className='sns-area'>
        <span>간편 로그인하기</span>
        <div className='sns-wrap'>
          <Link
            href='https://www.google.com'
            className='btn-sns'
            title='구글 로그인 페이지 이동'
          >
            <Image fill src='/icons/ic_google.png' alt='구글 아이콘' />
          </Link>
          <Link
            href='https://www.kakaocorp.com/page'
            className='btn-sns'
            title='카카오 로그인 페이지 이동'
          >
            <Image fill src='/icons/ic_kakao.png' alt='카카오 아이콘' />
          </Link>
        </div>
      </div>
      {formType === "login" ? (
        <div className='switch-area'>
          판다마켓이 처음이신가요?
          <Link href='/signup' title='회원가입 페이지 이동'>
            회원가입
          </Link>
        </div>
      ) : (
        <div className='switch-area'>
          이미 회원이신가요?
          <Link href='/login' title='로그인 페이지 이동'>
            로그인
          </Link>
        </div>
      )}
    </form>
  );
}

export default Form;
