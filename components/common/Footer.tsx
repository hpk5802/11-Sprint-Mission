import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className='footer-wrap'>
        <div className='corp'>©codeit - 2024</div>
        <div className='links'>
          <Link href='pages/privacy.html' title='Privacy Policy 페이지 이동'>
            Privacy Policy
          </Link>
          <Link href='pages/faq.html' title='FAQ 페이지 이동'>
            FAQ
          </Link>
        </div>
        <div className='sns'>
          <Link href='https://www.facebook.com' title='페이스북 바로가기'>
            <Image fill src='/icons/ic_facebook.png' alt='페이스북' />
          </Link>
          <Link href='https://x.com' title='트위터 이동'>
            <Image fill src='/icons/ic_twitter.png' alt='트위터' />
          </Link>
          <Link href='https://www.youtube.com' title='유튜브 이동'>
            <Image fill src='/icons/ic_youtube.png' alt='유튜브' />
          </Link>
          <Link href='https://www.instagram.com' title='인스타그램 이동'>
            <Image fill src='/icons/ic_instagram.png' alt='인스타그램' />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
