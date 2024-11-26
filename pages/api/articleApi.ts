const SERVER_URL = "https://panda-market-api.vercel.app";

const fetchArticles = async ({
  page = "1",
  pageSize = "10",
  orderBy = "like",
  keyword = "",
} = {}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", keyword);

    const response = await fetch(`${SERVER_URL}/articles?${queryParams}`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { fetchArticles };
