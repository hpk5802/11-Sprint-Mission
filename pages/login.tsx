import EmailInput from "@/components/auth/EmailInput";
import Form from "@/components/auth/Form";
import PassWordInput from "@/components/auth/PassWordInput";
import useInputReducer from "@/reducers/useInputReducer";
import { AuthFormState } from "@/types/authForm";
import Image from "next/image";
import Link from "next/link";
import { useReducer } from "react";

const INITIAL_FORM_STATE: AuthFormState = {
  email: {
    value: "",
    isValid: false,
    errorMessage: "",
  },
  password: {
    value: "",
    isValid: false,
    errorMessage: "",
  },
  isFormValid: false,
};

function Login() {
  const [state, dispatch] = useReducer(useInputReducer, INITIAL_FORM_STATE);
  const { email, password, isFormValid } = state;

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
      <Form formType='login' isValid={isFormValid}>
        <EmailInput state={email} handleValue={dispatch} />
        <PassWordInput state={password} handleValue={dispatch} />
      </Form>
    </div>
  );
}

export default Login;
