/**
 * 화면 사이즈에 맞는 디바이스를 리턴
 * @param {*} width 화면 width
 * @returns 'pc' | 'tablet' | 'mobile'
 */
const getBreakpoint = (width) => {
  if (width >= 1200) {
    return "pc";
  } else if (width >= 768) {
    return "tablet";
  } else {
    return "mobile";
  }
};

/**
 * 각 디바이스마다 화면에 표시할 product 수 리턴
 * @param {*} device 'pc' | 'tablet' | 'mobile'
 * @returns
 */
const updateProductsPerPage = (device) => {
  if (device === "pc") {
    return 10;
  } else if (device === "tablet") {
    return 6;
  } else {
    return 4;
  }
};

export { getBreakpoint, updateProductsPerPage };
