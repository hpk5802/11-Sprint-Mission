import { FormInputInterface } from "@/types/addBoard";
import { ArticleInquiryInterface, PostCommentInterface } from "@/types/article";
import { useRouter } from "next/router";

const fetchArticles = async ({
  page = "1",
  pageSize = "10",
  orderBy = "like",
  keyword = "",
}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", keyword);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchArticleById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchInquiryById = async (id: string, cursor: string | null = null) => {
  try {
    const queryParams = new URLSearchParams({ limit: "5" });
    if (cursor) queryParams.set("cursor", cursor);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}/comments?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (file: string) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("업로드 실패");
    }

    const data = await response.json(); // 서버의 JSON 응답
    return data.url; // 서버 URL 리턴해서 postArticle API에서 사용
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    return null;
  }
};

const postArticle = async ({ title, content, image }: FormInputInterface) => {
  let imageUrl = null;

  if (image) {
    // 이미지 업로드 후 URL 받기
    imageUrl = await uploadImage(image[0]);
  }

  const data = {
    image: imageUrl,
    content,
    title,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return result.id;
    } else {
      throw new Error("게시글 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

const postArticleComment = async ({
  id,
  content,
}: PostCommentInterface): Promise<ArticleInquiryInterface> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({ content }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error("댓글 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

export {
  fetchArticles,
  fetchArticleById,
  fetchInquiryById,
  postArticle,
  postArticleComment,
};
