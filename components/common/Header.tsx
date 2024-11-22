import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  isLogin?: boolean;
}

function Header({ isLogin = false }: HeaderProps) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <header>
      <h1 className='logo'>
        <Link href='/' className='link-home' title='판다마켓 홈 이동'>
          <div className='logo-img logo-pc'>
            <Image fill src='/home/logo.png' alt='판다마켓 로고' />
          </div>
          <div className='logo-img logo-mobile'>
            <Image fill src='/home/logo_mobile.png' alt='판다마켓 로고' />
          </div>
        </Link>
      </h1>
      {isLogin ? (
        <div className='login-area'>
          <div className='content-link'>
            <Link
              href='/boards'
              title='자유 게시판 페이지 이동'
              className={pathname.startsWith("/boards") ? "active" : ""}
            >
              자유게시판
            </Link>
            <Link
              href='/items'
              title='중고 마켓 페이지 이동'
              className={
                pathname.startsWith("/items") || pathname.startsWith("/addItem")
                  ? "active"
                  : ""
              }
            >
              중고마켓
            </Link>
          </div>
          <Link
            href='/profile'
            className='link-profile'
            title='프로필 페이지 이동'
          >
            <Image fill src='/icons/ic_user.svg' alt='프로필 이미지' />
          </Link>
        </div>
      ) : (
        <Link href='/login' className='link-login' title='로그인 페이지 이동'>
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
