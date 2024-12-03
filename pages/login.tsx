import EmailInput from "@/components/auth/EmailInput";
import Form from "@/components/auth/Form";
import PassWordInput from "@/components/auth/PassWordInput";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginAndSetToken } from "./api/authApi";
import { LoginInterface } from "@/types/auth";
import { useRouter } from "next/router";

const INITIAL_FORM_STATE: LoginInterface = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInterface>({
    mode: "onBlur",
    defaultValues: INITIAL_FORM_STATE,
  });

  const onSubmit: SubmitHandler<LoginInterface> = async ({
    email,
    password,
  }) => {
    await LoginAndSetToken({ email, password });
    router.push("/");
  };

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
        formType='login'
        isValid={isValid}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <EmailInput
          register={register("email", { required: "이메일을 입력해주세요." })}
          errorMessage={errors.email?.message}
        />
        <PassWordInput
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          errorMessage={errors.password?.message}
        />
      </Form>
    </div>
  );
}

export default Login;
