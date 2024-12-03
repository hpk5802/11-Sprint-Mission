import { LoginInterface } from "@/types/auth";

const LoginAndSetToken = async ({ email, password }: LoginInterface) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();

      // localStorage에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("토큰이 성공적으로 설정되었습니다.");
    } else {
      throw new Error("로그인 실패: 서버에서 인증 정보를 확인하세요.");
    }
  } catch (error) {
    console.error("초기 로그인 요청 실패:", error);
    throw error;
  }
};

export { LoginAndSetToken };
