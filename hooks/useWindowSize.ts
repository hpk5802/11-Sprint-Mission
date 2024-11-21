import { throttle } from "lodash";
import { useEffect, useState } from "react";

const devices = {
  desktop: 1200,
  tablet: 768,
};

/**
 * 화면 사이즈로 Device가 Desktop인지 감지하는 커스텀 훅
 * @returns isDesktop : 화면 사이즈 1200 이상인지
 */
function useWindowSize() {
  const [page, setPage] = useState(10); // 기본값 4로 설정

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = throttle(() => {
        if (window.innerWidth >= devices.desktop) {
          setPage(10);
        } else if (window.innerWidth >= devices.tablet) {
          setPage(6);
        } else {
          setPage(4);
        }
      }, 500);

      // 초기 화면 크기 설정
      handleResize();

      // resize 이벤트 리스너 등록
      window.addEventListener("resize", handleResize);

      // 컴포넌트 언마운트 시 리스너 제거
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // 의존성 배열 비워두기, 한 번만 실행되도록

  return page;
}

export default useWindowSize;
