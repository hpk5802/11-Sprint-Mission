import EmailInput from "@/components/auth/EmailInput";
import Form from "@/components/auth/Form";
import NickNameInput from "@/components/auth/NickNameInput";
import PassWordInput from "@/components/auth/PassWordInput";
import PassWordInputConfirm from "@/components/auth/PassWordInputConfirm";
import { SignupInterface } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUp } from "./api/authApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const INITIAL_FORM_STATE: SignupInterface = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupInterface>({
    mode: "onBlur",
    defaultValues: INITIAL_FORM_STATE,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<SignupInterface> = async ({
    email,
    nickname,
    password,
  }) => {
    const res = await signUp({ email, nickname, password });

    if (res.message) setError(res.message);
    else router.push("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) router.push("/");
    else setIsLoading(false);
  }, [router]);

  if (isLoading) return null;

  return (
    <div className='container'>
      <h1 className='logo'>
        <Link href='/' className='link-login' title='판다마켓 홈 이동'>
          <Image
            fill
            src='/login/logo.png'
            className='logo-img'
            alt='판다마켓 로고'
          />
        </Link>
      </h1>
      <Form
        formType='signup'
        isValid={isValid}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <EmailInput
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "잘못된 이메일입니다.",
            },
          })}
          errorMessage={errors.email?.message}
        />
        <NickNameInput
          register={register("nickname", {
            required: "닉네임을 입력해주세요.",
            minLength: {
              value: 1,
              message: "닉네임을 최소 1글자 입력해주세요.",
            },
          })}
          errorMessage={errors.nickname?.message}
        />
        <PassWordInput
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해주세요.",
            },
          })}
          errorMessage={errors.password?.message}
        />
        <PassWordInputConfirm
          register={register("passwordConfirm", {
            required: "비밀번호를 입력해주세요.",
            validate: (value) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          })}
          errorMessage={errors.passwordConfirm?.message}
        />
      </Form>
      {error && <div className='res-message'>{error}</div>}
    </div>
  );
}

export default Signup;
