import Header from "@/components/common/Header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header isLogin />
      <div className='page-detail'>
        <Link href='/boards' className='navigate-to-items'>
          목록으로 돌아가기
          <span>
            {/* Sprint10에 추가 예정 */}
            <Image fill src='/icons/ic_back.svg' alt='목록으로 돌아가기' />
          </span>
        </Link>
      </div>
    </>
  );
}

export default Detail;
