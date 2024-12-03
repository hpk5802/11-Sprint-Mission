import usePasswordVisibility from "@/hooks/usePassWordVisivility";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputInterface {
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

function PassWordInput({ register, errorMessage }: PasswordInputInterface) {
  const { inputType, toggleVisibility } = usePasswordVisibility();

  return (
    <div className='input-area password'>
      <label htmlFor='input_password'>비밀번호</label>
      <input
        type={inputType}
        id='input_password'
        className='pw'
        placeholder='비밀번호를 입력해주세요'
        {...register}
      />
      {errorMessage && <span className='msg-error'>{errorMessage}</span>}
      <button
        type='button'
        className='btn-toggle'
        title='비밀번호 노출 토글'
        onClick={toggleVisibility}
      >
        <span className='sr-only'>비밀번호 노출 토글</span>
      </button>
    </div>
  );
}

export default PassWordInput;
