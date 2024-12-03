import Header from "@/components/common/Header";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { useEffect } from "react";
import { setTokensToLocalStorage } from "./api/articleApi";

export default function Home() {
  useEffect(() => {
    setTokensToLocalStorage();
  }, []);
  return (
    <>
      <Header />
      <main>
        <section className='section-layout section-layout-bg top'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='section-content-inner'>
                <h2 className='section-title'>
                  일상의 모든 물건을
                  <br />
                  거래해 보세요
                </h2>
                <Link
                  href='/items'
                  className='link-item'
                  title='아이템 페이지 이동'
                >
                  구경하러 가기
                </Link>
              </div>
              <div className='img-home top'>
                <Image
                  fill
                  src='/home/img_home_top.png'
                  alt='일상의 모든 물건을 거래해 보세요'
                />
              </div>
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-card'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='img-pc'>
                <Image fill src='/home/img_home_01.png' alt='Hot item 이미지' />
              </div>
              <div className='img-tablet'>
                <Image
                  fill
                  src='/home/img_home_01_tablet.png'
                  alt='Hot item 이미지'
                />
              </div>
              <div className='img-mobile'>
                <Image
                  fill
                  src='/home/img_home_01_mobile.png'
                  alt='Hot item 이미지'
                />
              </div>
              <div className='section-content-inner'>
                <div>
                  <span className='badge'>Hot item</span>
                  <h2 className='section-title'>
                    인기 상품을
                    <br />
                    확인해 보세요
                  </h2>
                  <p className='section-desc'>
                    가장 HOT한 중고거래 물품을
                    <br />
                    판다 마켓에서 확인해 보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-card'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='section-content-inner'>
                <div>
                  <span className='badge'>Search</span>
                  <h2 className='section-title'>
                    구매를 원하는
                    <br />
                    상품을 검색하세요
                  </h2>
                  <p className='section-desc'>
                    구매하고 싶은 물품은 검색해서
                    <br />
                    쉽게 찾아보세요
                  </p>
                </div>
              </div>
              <div className='img-pc'>
                <Image fill src='/home/img_home_02.png' alt='Search 이미지' />
              </div>
              <div className='img-tablet'>
                <Image
                  fill
                  src='/home/img_home_02_tablet.png'
                  alt='Search 이미지'
                />
              </div>
              <div className='img-mobile'>
                <Image
                  fill
                  src='/home/img_home_02_mobile.png'
                  alt='Search 이미지'
                />
              </div>
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-card'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='img-pc'>
                <Image fill src='/home/img_home_03.png' alt='Register 이미지' />
              </div>
              <div className='img-tablet'>
                <Image
                  fill
                  src='/home/img_home_03_tablet.png'
                  alt='Register 이미지'
                />
              </div>
              <div className='img-mobile'>
                <Image
                  fill
                  src='/home/img_home_03_mobile.png'
                  alt='Register 이미지'
                />
              </div>
              <div className='section-content-inner'>
                <div>
                  <span className='badge'>Register</span>
                  <h2 className='section-title'>
                    판매를 원하는
                    <br />
                    상품을 등록하세요
                  </h2>
                  <p className='section-desc'>
                    어떤 물건이든 판매하고 싶은 상품을
                    <br />
                    쉽게 등록하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-bg bottom'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='section-content-inner'>
                <h2 className='section-title mb-60'>
                  믿을 수 있는
                  <br />
                  판다마켓 중고 거래
                </h2>
              </div>
              <div className='img-home bottom'>
                <Image
                  fill
                  src='/home/img_home_bottom.png'
                  alt='믿을 수 있는 판다마켓 중고 거래'
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
